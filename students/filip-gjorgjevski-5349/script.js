// Configuration
const CONFIG = {
    DATA_URL: 'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-full.json',
    DATE_FORMATS: {
        ISO: 'YYYY-MM-DD',
        UK: 'DD/MM/YYYY',
        LONG: 'MMMM DD, YYYY',
        YEAR: 'YYYY'
    },
    ERA_ORDER: ['Classic', 'Modern', 'Recent']
};

// State Management
let state = {
    episodes: [],          // Original data, remains unmodified
    filtered: [],          // Filtered and sorted results for display
    loading: true,         // Loading state
    error: null,           // Error message
    sort: {
        field: 'rank',     // Current sort field
        ascending: true    // Sort direction
    },
    filters: {
        name: ''           // Current filter value
    }
};

// Initialize Application
async function init() {
    setupEventListeners();
    await loadEpisodes();
}

// Event Listeners Setup
function setupEventListeners() {
    // 1. Filter input changes
    const nameFilter = document.getElementById('name-filter');
    nameFilter.addEventListener('input', (e) => {
        state.filters.name = e.target.value;
        applyFiltersAndSort();
    });

    // 2. Column header clicks (sorting)
    document.querySelectorAll('#episodes-table thead th[data-sort]').forEach(header => {
        header.addEventListener('click', () => {
            const field = header.dataset.sort;
            if (state.sort.field === field) {
                state.sort.ascending = !state.sort.ascending;
            } else {
                state.sort.field = field;
                state.sort.ascending = true;
            }
            applyFiltersAndSort();
        });
    });
}

// Data Loading
async function loadEpisodes() {
    try {
        showLoading(true);
        const response = await fetch(CONFIG.DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // FIX: Access the nested 'episodes' array from the JSON object
        state.episodes = data.episodes; 
        applyFiltersAndSort(); 
    } catch (error) {
        showError('Failed to load episodes: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Main function to apply filters and sorting, then update the display
function applyFiltersAndSort() {
    const filterText = state.filters.name.toLowerCase();

    // 1. Apply more comprehensive filtering
    let processedData = state.episodes.filter(episode => {
        const title = episode.title?.toLowerCase() || '';
        const doctor = formatDoctor(episode.doctor).toLowerCase();
        const companion = formatCompanion(episode.companion).toLowerCase();
        const writer = episode.writer?.toLowerCase() || '';
        const director = episode.director?.toLowerCase() || '';
        const cast = formatCast(episode.cast).toLowerCase();

        return title.includes(filterText) ||
               doctor.includes(filterText) ||
               companion.includes(filterText) ||
               writer.includes(filterText) ||
               director.includes(filterText) ||
               cast.includes(filterText);
    });

    // 2. Apply smarter sorting
    const { field, ascending } = state.sort;
    const direction = ascending ? 1 : -1;

    processedData.sort((a, b) => {
        const valA = getSortValue(a, field);
        const valB = getSortValue(b, field);

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0;
    });

    state.filtered = processedData;
    displayEpisodes(state.filtered);
}

// Display Functions
function displayEpisodes(episodes) {
    const tableBody = document.getElementById('episodes-body');
    const noResults = document.getElementById('no-results');
    tableBody.innerHTML = '';

    noResults.style.display = episodes.length === 0 ? 'block' : 'none';

    episodes.forEach(episode => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${episode.rank ?? 'N/A'}</td>
            <td>${episode.title ?? 'N/A'}</td>
            <td>${episode.series ?? 'N/A'}</td>
            <td>${episode.era ?? 'N/A'}</td>
            <td>${formatDate(episode.broadcast_date, CONFIG.DATE_FORMATS.YEAR)}</td>
            <td>${episode.director || 'N/A'}</td>
            <td>${episode.writer || 'N/A'}</td>
            <td>${formatDoctor(episode.doctor)}</td>
            <td>${formatCompanion(episode.companion)}</td>
            <td>${formatCast(episode.cast)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// UTILITY FUNCTIONS

// Gets a comparable value for sorting complex fields
function getSortValue(episode, field) {
    switch (field) {
        case 'doctor':
            return formatDoctor(episode.doctor).toLowerCase();
        case 'companion':
            return formatCompanion(episode.companion).toLowerCase();
        case 'cast':
            return formatCast(episode.cast).toLowerCase();
        case 'title':
        case 'era':
        case 'director':
        case 'writer':
            return (episode[field] || '').toLowerCase();
        case 'broadcast_date':
            return normalizeDate(episode.broadcast_date)?.getTime() || 0;
        default: // rank, series
            return episode[field] ?? -Infinity;
    }
}

// FIX: Helper functions to correctly format nested data for display
function formatDoctor(doctor) {
    return doctor?.actor || 'N/A';
}

function formatCompanion(companion) {
    return companion?.actor || 'N/A';
}

function formatCast(cast) {
    if (!Array.isArray(cast) || cast.length === 0) return 'N/A';
    return cast.map(member => member.actor).filter(Boolean).join(', ');
}

// FIX: More robust date parsing for different formats in the source data
function normalizeDate(dateString) {
    if (!dateString) return null;
    
    // Handle YYYY format
    if (/^\d{4}$/.test(dateString)) {
        return new Date(dateString, 0, 1);
    }
    
    // Handle DD/MM/YYYY format
    if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }
    
    // Should handle 'YYYY-MM-DD' and 'MMMM DD YYYY'
    const date = new Date(dateString);
    return isNaN(date) ? null : date;
}

function formatDate(dateString, format = 'UK') {
    const date = normalizeDate(dateString);
    if (!date) return 'N/A';

    if (format === 'YYYY') {
        return date.getFullYear();
    }
    // Other formats can be added here if needed
    return date.toLocaleDateString('en-GB'); // e.g., DD/MM/YYYY
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
    document.getElementById('episodes-table').style.display = show ? 'table' : 'none';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', init);
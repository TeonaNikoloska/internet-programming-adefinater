// Configuration
const CONFIG = {
    DATA_URLS: [
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-01-10.json',
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-11-20.json',
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-21-30.json',
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-31-40.json',
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-41-50.json',
        'https://raw.githubusercontent.com/sweko/internet-programming-adefinater/refs/heads/preparation/data/doctor-who-episodes-51-65.json'
    ]
};

// State Management
let state = {
    episodes: [],
    filtered: [],
    sort: { field: 'rank', ascending: true },
    filters: { name: '' }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await loadEpisodes();
});

// Event Listeners Setup
function setupEventListeners() {
    document.getElementById('name-filter').addEventListener('input', (e) => {
        state.filters.name = e.target.value;
        applyFiltersAndSort();
    });

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
        const promises = CONFIG.DATA_URLS.map(url => fetch(url));
        const responses = await Promise.all(promises);

        for (const response of responses) {
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${response.url} (${response.statusText})`);
            }
        }

        const jsonDataArray = await Promise.all(responses.map(res => res.json()));
        state.episodes = jsonDataArray.flatMap(data => data.episodes);
        applyFiltersAndSort();
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Main function to apply filters and sorting
function applyFiltersAndSort() {
    const filterText = state.filters.name.toLowerCase();

    let processedData = state.episodes.filter(episode => {
        // Handle null/missing values gracefully during filtering
        const title = episode.title?.toLowerCase() || '';
        const doctor = formatDoctor(episode.doctor, false).toLowerCase();
        const companion = formatCompanion(episode.companion, false).toLowerCase();
        const writer = episode.writer?.toLowerCase() || '';
        const director = episode.director?.toLowerCase() || '';

        return title.includes(filterText) || doctor.includes(filterText) ||
               companion.includes(filterText) || writer.includes(filterText) ||
               director.includes(filterText);
    });

    const { field, ascending } = state.sort;
    const direction = ascending ? 1 : -1;

    processedData.sort((a, b) => {
        const valA = getSortValue(a, field);
        const valB = getSortValue(b, field);
        return (valA < valB ? -1 : valA > valB ? 1 : 0) * direction;
    });

    state.filtered = processedData;
    displayEpisodes(state.filtered);
}

// Display Functions - REWRITTEN FOR ROBUSTNESS AND SECURITY
function displayEpisodes(episodes) {
    const tableBody = document.getElementById('episodes-body');
    tableBody.innerHTML = ''; // Clear existing rows

    updateSortHeaders();
    document.getElementById('no-results').style.display = episodes.length === 0 ? 'block' : 'none';

    episodes.forEach(episode => {
        const row = tableBody.insertRow();
        
        // Use textContent to safely render special characters and prevent XSS
        const createCell = (text) => {
            const cell = row.insertCell();
            // Handle missing/null values gracefully for all fields
            cell.textContent = text ?? 'N/A';
            return cell;
        };

        createCell(episode.rank);
        createCell(episode.title);
        createCell(episode.series);
        createCell(episode.era);
        createCell(getYear(episode.broadcast_date));
        createCell(episode.director);
        createCell(episode.writer); // Displays multiple writers correctly as it's a single string
        createCell(formatDoctor(episode.doctor));
        createCell(formatCompanion(episode.companion)); // Handles null companion data
        createCell(episode.cast?.length || 0); // Handles empty or null cast arrays
    });
}

// UTILITY FUNCTIONS

function getSortValue(episode, field) {
    switch (field) {
        case 'doctor':
            return formatDoctor(episode.doctor, false).toLowerCase();
        case 'companion':
            return formatCompanion(episode.companion, false).toLowerCase();
        case 'cast_count':
            return episode.cast?.length || 0; // Sorts empty/null cast as 0
        case 'broadcast_date':
            // Sort dates with mixed formats by normalizing them first
            return normalizeDate(episode.broadcast_date)?.getTime() || 0;
        default:
            return (episode[field] || '').toString().toLowerCase();
    }
}

function updateSortHeaders() {
    document.querySelectorAll('#episodes-table thead th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
        if (th.dataset.sort === state.sort.field) {
            th.classList.add(state.sort.ascending ? 'sort-asc' : 'sort-desc');
        }
    });
}

// Handles various date formats for reliable parsing
function normalizeDate(dateString) {
    if (!dateString) return null;
    if (/^\d{4}$/.test(dateString)) return new Date(dateString, 0, 1);
    if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}

// Formatters for display
function formatDoctor(doctor, includeIncarnation = true) {
    if (!doctor?.actor) return 'N/A';
    return includeIncarnation ? `${doctor.actor} (${doctor.incarnation || 'N/A'})` : doctor.actor;
}

function formatCompanion(companion, includeCharacter = true) {
    if (!companion?.actor) return 'N/A'; // Handles null/missing companion
    return includeCharacter ? `${companion.actor} (${companion.character || 'N/A'})` : companion.actor;
}

function getYear(dateString) {
    const date = normalizeDate(dateString);
    return date ? date.getFullYear() : 'N/A';
}

// UI State Changers
function showLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
    document.getElementById('episodes-table').style.display = isLoading ? 'none' : 'table';
    if (isLoading) document.getElementById('error').style.display = 'none';
}

function showError(details) {
    const errorElement = document.getElementById('error');
    // Format error messages clearly with user-friendly text and technical details
    const userMessage = "Error: Could not load Doctor Who episodes. Please check your network connection and try again.";
    errorElement.textContent = `${userMessage}\nDetails: ${details}`;
    errorElement.style.display = 'block';
    
    document.getElementById('episodes-table').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
}
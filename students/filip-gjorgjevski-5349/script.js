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
    filters: { name: '' },
    focusedRowIndex: -1
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
            if (state.sort.field === field) state.sort.ascending = !state.sort.ascending;
            else {
                state.sort.field = field;
                state.sort.ascending = true;
            }
            applyFiltersAndSort();
        });
    });

    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Data Loading
async function loadEpisodes() {
    try {
        showLoading(true);
        const promises = CONFIG.DATA_URLS.map(url => fetch(url));
        const responses = await Promise.all(promises);

        for (const response of responses) {
            if (!response.ok) throw new Error(`Failed to fetch from ${response.url} (${response.statusText})`);
        }

        const jsonDataArray = await Promise.all(responses.map(res => res.json()));
        const allEpisodes = jsonDataArray.flatMap(data => data.episodes);

        // Perform data validation
        const warnings = validateData(allEpisodes);
        if (warnings.length > 0) {
            warnings.forEach(w => console.warn(w));
            const warningsDiv = document.getElementById('validation-warnings');
            warningsDiv.textContent = `Found ${warnings.length} data validation warning(s). See console for details.`;
            warningsDiv.style.display = 'block';
        }

        state.episodes = allEpisodes;
        applyFiltersAndSort();

    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// NEW: Data Validation Function
function validateData(episodes) {
    const warnings = [];
    const seenRanks = new Set();
    const now = new Date();
    const requiredFields = ['rank', 'title', 'era', 'broadcast_date'];

    episodes.forEach((episode, index) => {
        const episodeId = `Episode "${episode.title || `(Untitled at index ${index}`})"`;

        // Check for missing required fields
        requiredFields.forEach(field => {
            if (episode[field] === null || episode[field] === undefined || episode[field] === '') {
                warnings.push(`Validation Error: ${episodeId} is missing required field '${field}'.`);
            }
        });

        // Check for future broadcast dates
        const broadcastDate = normalizeDate(episode.broadcast_date);
        if (broadcastDate && broadcastDate > now) {
            warnings.push(`Validation Error: ${episodeId} has a future broadcast date: ${episode.broadcast_date}.`);
        }

        // Check for duplicate/invalid ranks
        if (typeof episode.rank !== 'number' || !isFinite(episode.rank)) {
            warnings.push(`Validation Error: ${episodeId} has an invalid rank: ${episode.rank}.`);
        } else {
            if (seenRanks.has(episode.rank)) {
                warnings.push(`Validation Error: Duplicate rank found. Rank '${episode.rank}' is used by ${episodeId} and another episode.`);
            }
            seenRanks.add(episode.rank);
        }

        // Check for negative series numbers
        if (typeof episode.series === 'number' && episode.series < 0) {
            warnings.push(`Validation Error: ${episodeId} has a negative series number: ${episode.series}.`);
        }
    });

    return warnings;
}


// Main function to apply filters and sorting
function applyFiltersAndSort() {
    state.focusedRowIndex = -1;
    const filterText = state.filters.name.toLowerCase();
    
    let processedData = state.episodes.filter(ep => {
        const title = ep.title?.toLowerCase() || '';
        const doctor = formatDoctor(ep.doctor, false).toLowerCase();
        const companion = formatCompanion(ep.companion, false).toLowerCase();
        const writer = ep.writer?.toLowerCase() || '';
        const director = ep.director?.toLowerCase() || '';
        return title.includes(filterText) || doctor.includes(filterText) || companion.includes(filterText) || writer.includes(filterText) || director.includes(filterText);
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

// Display Functions
function displayEpisodes(episodes) {
    const tableBody = document.getElementById('episodes-body');
    tableBody.innerHTML = '';
    updateSortHeaders();
    document.getElementById('no-results').style.display = episodes.length === 0 ? 'block' : 'none';

    episodes.forEach((episode, index) => {
        const row = tableBody.insertRow();
        const createCell = text => {
            const cell = row.insertCell();
            cell.textContent = text ?? 'N/A';
            return cell;
        };

        createCell(episode.rank);
        createCell(episode.title);
        createCell(episode.series);
        createCell(episode.era);
        createCell(getYear(episode.broadcast_date));
        createCell(episode.director);
        createCell(episode.writer);
        createCell(formatDoctor(episode.doctor));
        createCell(formatCompanion(episode.companion));
        createCell(episode.cast?.length || 0);

        row.addEventListener('click', () => {
            state.focusedRowIndex = index;
            updateRowFocus();
        });
    });
    updateRowFocus();
}

// Keyboard Navigation Handler
function handleKeyboardNavigation(e) {
    if (e.key === 'Enter' && document.activeElement.tagName === 'TH') {
        e.preventDefault();
        document.activeElement.click();
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const numRows = state.filtered.length;
        if (numRows === 0) return;
        state.focusedRowIndex = Math.max(0, Math.min(numRows - 1, state.focusedRowIndex + direction));
        updateRowFocus();
    }
}

// Utility Functions
function getSortValue(ep, field) {
    switch (field) {
        case 'doctor': return formatDoctor(ep.doctor, false).toLowerCase();
        case 'companion': return formatCompanion(ep.companion, false).toLowerCase();
        case 'cast_count': return ep.cast?.length || 0;
        case 'broadcast_date': return normalizeDate(ep.broadcast_date)?.getTime() || 0;
        default: return (ep[field] || '').toString().toLowerCase();
    }
}

function updateRowFocus() {
    const rows = document.getElementById('episodes-body').rows;
    for (let i = 0; i < rows.length; i++) {
        if (i === state.focusedRowIndex) {
            rows[i].classList.add('focused');
            rows[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            rows[i].classList.remove('focused');
        }
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

function formatDoctor(doctor, includeIncarnation = true) {
    if (!doctor?.actor) return 'N/A';
    return includeIncarnation ? `${doctor.actor} (${doctor.incarnation || 'N/A'})` : doctor.actor;
}

function formatCompanion(companion, includeCharacter = true) {
    if (!companion?.actor) return 'N/A';
    return includeCharacter ? `${companion.actor} (${companion.character || 'N/A'})` : companion.actor;
}

function getYear(dateString) {
    const date = normalizeDate(dateString);
    return date ? date.getFullYear() : 'N/A';
}

function showLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
    document.getElementById('episodes-table').style.display = isLoading ? 'none' : 'table';
    if (isLoading) document.getElementById('error').style.display = 'none';
}

function showError(details) {
    const errorElement = document.getElementById('error');
    const userMessage = "Error: Could not load Doctor Who episodes. Please check your network connection and try again.";
    errorElement.textContent = `${userMessage}\nDetails: ${details}`;
    errorElement.style.display = 'block';
    document.getElementById('episodes-table').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
}
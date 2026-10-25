'use strict';
const guide = window.GUIDE;
const $ = (id) => document.getElementById(id);
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeURL = (url) => { try { const parsed = new URL(url, location.href); return ['https:', 'http:'].includes(parsed.protocol) ? escapeHTML(parsed.href) : '#sources'; } catch { return '#sources'; } };
const external = (url, label) => `<a href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`;
let saved = new Set();
try { const stored = JSON.parse(localStorage.getItem('phuket-edit-saved') || '[]'); if (Array.isArray(stored)) saved = new Set(stored.filter(id => typeof id === 'string')); } catch { /* Favourites still work for the current visit. */ }
const icon = {beach:'≈',water:'◒',culture:'⌂',food:'◌',wellness:'✳',adventure:'↗'};
const effortLabels = {easy:'Easy going',moderate:'A little active',active:'Active'};
if (guide.photos?.length) {
  $('scenery').hidden = false;
  $('scenery-gallery').innerHTML = guide.photos.map(photo => `<figure><img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt)}" loading="lazy" width="${Number(photo.width)||1200}" height="${Number(photo.height)||800}"><figcaption><strong>${escapeHTML(photo.caption)}</strong><span>${escapeHTML(photo.author)} · ${external(photo.source,'Original photograph')} · ${external(photo.licenseUrl,photo.license)}${photo.changes ? ' · '+escapeHTML(photo.changes):''}</span></figcaption></figure>`).join('');
}
const renderItinerary = () => {
  $('itinerary').innerHTML = guide.itinerary.map((day, index) => `<article class="day"><div class="day-top"><span class="day-number">${String(index + 1).padStart(2,'0')}</span><span class="day-label">${escapeHTML(day.label)}</span></div><h3>${escapeHTML(day.title)}</h3>${day.blocks.map(block => `<div class="day-block"><strong>${escapeHTML(block.time)}</strong><p>${escapeHTML(block.text)}</p></div>`).join('')}</article>`).join('');
};
const renderActivities = () => {
  const query = $('search').value.trim().toLocaleLowerCase();
  const list = guide.activities.filter(item => {
    const searchText = [item.title,item.category,item.description,item.details,item.area].join(' ').toLocaleLowerCase();
    return (!query || searchText.includes(query)) && ($('effort-filter').value === 'all' || item.effort === $('effort-filter').value) && ($('journey-filter').value === 'all' || item.journey === $('journey-filter').value) && ($('boat-filter').value === 'all' || (item.boat ? 'yes':'no') === $('boat-filter').value) && ($('weather-filter').value === 'all' || (item.rain ? 'rain':'dry') === $('weather-filter').value) && (!$('saved-filter').checked || saved.has(item.id));
  });
  $('results-count').textContent = `${list.length} of ${guide.activities.length} ideas · ${saved.size} saved`;
  $('empty-state').hidden = list.length > 0;
  $('activities').innerHTML = list.map(item => `<article class="activity-card"><div class="card-art ${escapeHTML(item.category)}">${item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt || item.title)}" loading="lazy">` : `<span class="art-glyph" aria-hidden="true">${icon[item.category] || '✳'}</span>`}<span class="art-category">${escapeHTML(item.area || item.category).toUpperCase()}</span><button class="save-button" data-save="${escapeHTML(item.id)}" aria-pressed="${saved.has(item.id)}" aria-label="${saved.has(item.id) ? 'Unsave':'Save'} ${escapeHTML(item.title)}">${saved.has(item.id) ? '✓ Saved':'+ Save'}</button></div><div class="card-body"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><div class="tags"><span class="tag">${effortLabels[item.effort]}</span><span class="tag">${escapeHTML(item.travel)}</span><span class="tag">${item.boat ? 'Boat day':'No boat'}</span><span class="tag">${item.rain ? 'Rain-friendly':'Dry-day favourite'}</span></div><div class="card-detail"><div><strong>Allow ${escapeHTML(item.duration)}</strong></div><div><strong>${escapeHTML(item.cost)}</strong><p>Planning estimate · ${escapeHTML(item.costBasis || 'per person')}</p></div>${item.details ? `<details class="more-details"><summary>Worth knowing</summary><p>${escapeHTML(item.details)}</p></details>` : ''}</div><div class="card-links">${item.url ? external(item.url,'Details & source') : ''}${item.map ? external(item.map,'Map') : ''}</div></div></article>`).join('');
};
$('stay-facts').innerHTML = guide.stay.map((fact,index) => `<article class="fact"><span class="fact-number">0${index+1}</span><div><h3>${escapeHTML(fact.title)}</h3><p>${escapeHTML(fact.text)}</p></div></article>`).join('');
renderItinerary();
renderActivities();
$('dining').innerHTML = guide.dining.map(item => `<article class="dining-card"><p class="location-label">${escapeHTML(item.area).toUpperCase()}</p><h3>${escapeHTML(item.title)}</h3><span class="inclusion ${item.included ? '':'extra'}">${escapeHTML(item.badge)}</span><p>${escapeHTML(item.description)}</p>${item.details ? `<details class="more-details"><summary>Menu, timing & practicalities</summary><p>${escapeHTML(item.details)}</p></details>`:''}<div class="card-links">${external(item.url,'Official details')}${item.map ? external(item.map,'Map'):''}</div></article>`).join('');
$('costs').innerHTML = guide.costs.map(item => `<article class="cost-card"><h3>${escapeHTML(item.title)}</h3><div class="cost-value">${escapeHTML(item.value)}</div><p class="cost-unit">${escapeHTML(item.unit)}</p><p>${escapeHTML(item.note)}</p></article>`).join('');
$('practical-list').innerHTML = guide.practical.map(item => `<details><summary>${escapeHTML(item.title)}</summary><p>${escapeHTML(item.text)}${item.url ? ' '+external(item.url,'Source'):''}</p></details>`).join('');
$('sources-list').innerHTML = guide.sources.map(item => `<div class="source-item">${external(item.url,item.title)}<span>${escapeHTML(item.note || 'Official source')} · checked ${escapeHTML(item.checked || guide.checked)}</span></div>`).join('');
$('checked-date').textContent = `Research checked ${guide.checked}. Reconfirm close to travel.`;
document.querySelector('.menu-toggle').addEventListener('click',event => {const button = event.currentTarget; const expanded = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded',String(!expanded)); $('navigation').classList.toggle('open',!expanded);});
$('navigation').addEventListener('click',event => {if (event.target.closest('a')) {$('navigation').classList.remove('open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');}});
['search','effort-filter','journey-filter','boat-filter','weather-filter','saved-filter'].forEach(id => $(id).addEventListener(id === 'search' ? 'input':'change',renderActivities));
$('reset-filters').addEventListener('click',() => {$('search').value=''; ['effort-filter','journey-filter','boat-filter','weather-filter'].forEach(id => $(id).value='all'); $('saved-filter').checked=false; renderActivities();});
$('activities').addEventListener('click',event => {const button = event.target.closest('[data-save]'); if (!button) return; const id=button.dataset.save; saved.has(id)?saved.delete(id):saved.add(id); let persisted=true; try {localStorage.setItem('phuket-edit-saved',JSON.stringify([...saved]));}catch{persisted=false;} renderActivities(); const replacement=document.querySelector(`[data-save="${CSS.escape(id)}"]`); if(replacement) replacement.focus(); $('save-status').textContent = `${saved.has(id)?'Saved':'Removed'}${persisted?' on this device.':' for this visit. Browser storage is unavailable.'}`;});
document.querySelector('.print-button').addEventListener('click',() => window.print());

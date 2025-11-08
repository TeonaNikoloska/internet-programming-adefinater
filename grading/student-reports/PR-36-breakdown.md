# Grading Breakdown - PR #36

**Student:** BorjanAngelkovski_5839
**Student ID:** 
**GitHub:** @BorjanAngelkovski
**Alternative:** Doctor Who

---

## Score Summary

| Category | Score | Percentage |
|----------|-------|------------|
| **Tier 1** (Basic Functionality) | 40 / 60 | 67% |
| **Tier 2** (Edge Case Handling) | 6 / 25 | 24% |
| **Tier 3** (Advanced Features) | 5 / 15 | 33% |
| **Subtotal** | 4065 / 100 | |
| **Bonus Points** | +0 | |
| **Deductions** | - | |
| **Total Points** | 51 / 100 | |
| **FINAL GRADE** | **51%%** | |

---

## Complete Points Breakdown

| Status | Test | Tier | Max Pts | Earned |
|--------|------|------|---------|--------|
| ✅ | Data Loads Successfully | 1 | 10 | 10 |
| ✅ | Loading Indicator Shown | 1 | 3 | 3 |
| ✅ | All Required Columns Present | 1 | 15 | 15 |
| ✅ | Semantic HTML Structure | 1 | 4 | 4 |
| ❌ | Clicking Headers Sorts Table | 1 | 8 | 0 |
| ❌ | Toggle Ascending/Descending | 1 | 4 | 0 |
| ✅ | Sort Direction Indicator | 1 | 3 | 3 |
| ✅ | Filter Input Field Exists | 1 | 5 | 5 |
| ❌ | Filter Actually Works | 1 | 5 | 0 |
|  | **─── TIER 1 SUBTOTAL ───** |  | 60 | 40 |
| ❌ | No "undefined" or "null" Text | 2 | 5 | 0 |
| ❌ | Empty Arrays Handled Gracefully | 2 | 3 | 0 |
| ❌ | Special Characters Render Correctly | 2 | 4 | 0 |
| ✅ | Error Messages User-Friendly | 2 | 3 | 3 |
| ❌ | Missing Data Fields Handled | 2 | 3 | 0 |
| ❌ | Nested Data Properly Formatted | 2 | 4 | 0 |
| ✅ | Multiple Date Formats Sorted | 2 | 3 | 3 |
|  | **─── TIER 2 SUBTOTAL ───** |  | 25 | 6 |
| ❌ | Performance Optimization | 3 | 5 | 0 |
| ❌ | Keyboard Navigation | 3 | 5 | 0 |
| ❌ | Smart Relevance Sorting | 3 | 5 | 0 |
| ❌ | Data Validation & Warnings | 3 | 5 | 0 |
| ✅ | Additional Filters | 3 | 5 | 5 |
| ❌ | Multi-Column Sorting | 3 | 5 | 0 |
| ❌ | Export to CSV | 3 | 5 | 0 |
| ❌ | Grouping/Decade Display | 3 | 5 | 0 |
|  | **─── TIER 3 SUBTOTAL ───** |  | 15 | 5 |
| | | | | |
|  | **BASE SCORE** |  | 100 | 51 |
| | | | | |
| **═══** | **FINAL TOTAL** | ═══ | 100 | 51 |

---

## Error Log

- ⚠️ Clicking headers sorts table: locator.textContent: Error: strict mode violation: locator('table tbody tr:first-child td:first-child') resolved to 6 elements: 1) <td colspan="10">…</td> aka getByRole('cell', { name: '2020s — 18 episodes' }) 2) <td colspan="10">…</td> aka getByRole('cell', { name: '2010s — 15 episodes' }) 3) <td colspan="10">…</td> aka getByRole('cell', { name: '2000s — 16 episodes' }) 4) <td colspan="10">…</td> aka getByRole('cell', { name: '1980s — 2 episodes' }) 5) <td colspan="10">…</td> aka getByRole('cell', { name: '1970s — 11 episodes' }) 6) <td colspan="10">…</td> aka getByRole('cell', { name: '1960s — 3 episodes' }) Call log: - waiting for locator('table tbody tr:first-child td:first-child')
- ⚠️ Toggle ascending/descending: locator.textContent: Error: strict mode violation: locator('table tbody tr:first-child td:first-child') resolved to 6 elements: 1) <td colspan="10">…</td> aka getByRole('cell', { name: '2020s — 18 episodes' }) 2) <td colspan="10">…</td> aka getByRole('cell', { name: '2010s — 15 episodes' }) 3) <td colspan="10">…</td> aka getByRole('cell', { name: '2000s — 16 episodes' }) 4) <td colspan="10">…</td> aka getByRole('cell', { name: '1980s — 2 episodes' }) 5) <td colspan="10">…</td> aka getByRole('cell', { name: '1970s — 11 episodes' }) 6) <td colspan="10">…</td> aka getByRole('cell', { name: '1960s — 3 episodes' }) Call log: - waiting for locator('table tbody tr:first-child td:first-child')
- ⚠️ No "undefined" or "null" text visible: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 10 elements: 1) <tbody id="episodes-body"></tbody> aka locator('#episodes-body') 2) <tbody class="decade-section">…</tbody> aka getByText('2020s — 18 episodes-7The') 3) <tbody class="decade-section">…</tbody> aka getByText('2010s — 15 episodes2Heaven') 4) <tbody class="decade-section">…</tbody> aka getByText('2000s — 16 episodes1Blink3Modern2007Hettie MacDonaldSteven MoffatDavid Tennant') 5) <tbody class="decade-section">…</tbody> aka getByText('1980s — 2 episodes21The Caves') 6) <tbody class="decade-section">…</tbody> aka getByText('1970s — 11 episodes20Genesis') 7) <tbody class="decade-section">…</tbody> aka getByText('1960s — 3 episodes23The Tomb') 8) <tbody class="decade-section">…</tbody> aka getByText('2020s — 3 episodes35The Power') 9) <tbody class="decade-section">…</tbody> aka getByText('2010s — 4 episodes4The Day of') 10) <tbody class="decade-section">…</tbody> aka getByText('2000s — 1 episode3The Empty') Call log: - waiting for locator('table tbody')
- ⚠️ Empty arrays handled gracefully: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 10 elements: 1) <tbody id="episodes-body"></tbody> aka locator('#episodes-body') 2) <tbody class="decade-section">…</tbody> aka getByText('2020s — 18 episodes-7The') 3) <tbody class="decade-section">…</tbody> aka getByText('2010s — 15 episodes2Heaven') 4) <tbody class="decade-section">…</tbody> aka getByText('2000s — 16 episodes1Blink3Modern2007Hettie MacDonaldSteven MoffatDavid Tennant') 5) <tbody class="decade-section">…</tbody> aka getByText('1980s — 2 episodes21The Caves') 6) <tbody class="decade-section">…</tbody> aka getByText('1970s — 11 episodes20Genesis') 7) <tbody class="decade-section">…</tbody> aka getByText('1960s — 3 episodes23The Tomb') 8) <tbody class="decade-section">…</tbody> aka getByText('2020s — 3 episodes35The Power') 9) <tbody class="decade-section">…</tbody> aka getByText('2010s — 4 episodes4The Day of') 10) <tbody class="decade-section">…</tbody> aka getByText('2000s — 1 episode3The Empty') Call log: - waiting for locator('table tbody')
- ⚠️ Special characters render correctly: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 10 elements: 1) <tbody id="episodes-body"></tbody> aka locator('#episodes-body') 2) <tbody class="decade-section">…</tbody> aka getByText('2020s — 18 episodes-7The') 3) <tbody class="decade-section">…</tbody> aka getByText('2010s — 15 episodes2Heaven') 4) <tbody class="decade-section">…</tbody> aka getByText('2000s — 16 episodes1Blink3Modern2007Hettie MacDonaldSteven MoffatDavid Tennant') 5) <tbody class="decade-section">…</tbody> aka getByText('1980s — 2 episodes21The Caves') 6) <tbody class="decade-section">…</tbody> aka getByText('1970s — 11 episodes20Genesis') 7) <tbody class="decade-section">…</tbody> aka getByText('1960s — 3 episodes23The Tomb') 8) <tbody class="decade-section">…</tbody> aka getByText('2020s — 3 episodes35The Power') 9) <tbody class="decade-section">…</tbody> aka getByText('2010s — 4 episodes4The Day of') 10) <tbody class="decade-section">…</tbody> aka getByText('2000s — 1 episode3The Empty') Call log: - waiting for locator('table tbody')
- ⚠️ Missing/null values display placeholders: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 10 elements: 1) <tbody id="episodes-body"></tbody> aka locator('#episodes-body') 2) <tbody class="decade-section">…</tbody> aka getByText('2020s — 18 episodes-7The') 3) <tbody class="decade-section">…</tbody> aka getByText('2010s — 15 episodes2Heaven') 4) <tbody class="decade-section">…</tbody> aka getByText('2000s — 16 episodes1Blink3Modern2007Hettie MacDonaldSteven MoffatDavid Tennant') 5) <tbody class="decade-section">…</tbody> aka getByText('1980s — 2 episodes21The Caves') 6) <tbody class="decade-section">…</tbody> aka getByText('1970s — 11 episodes20Genesis') 7) <tbody class="decade-section">…</tbody> aka getByText('1960s — 3 episodes23The Tomb') 8) <tbody class="decade-section">…</tbody> aka getByText('2020s — 3 episodes35The Power') 9) <tbody class="decade-section">…</tbody> aka getByText('2010s — 4 episodes4The Day of') 10) <tbody class="decade-section">…</tbody> aka getByText('2000s — 1 episode3The Empty') Call log: - waiting for locator('table tbody')
- ⚠️ Nested data (award/series) formatted properly: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 10 elements: 1) <tbody id="episodes-body"></tbody> aka locator('#episodes-body') 2) <tbody class="decade-section">…</tbody> aka getByText('2020s — 18 episodes-7The') 3) <tbody class="decade-section">…</tbody> aka getByText('2010s — 15 episodes2Heaven') 4) <tbody class="decade-section">…</tbody> aka getByText('2000s — 16 episodes1Blink3Modern2007Hettie MacDonaldSteven MoffatDavid Tennant') 5) <tbody class="decade-section">…</tbody> aka getByText('1980s — 2 episodes21The Caves') 6) <tbody class="decade-section">…</tbody> aka getByText('1970s — 11 episodes20Genesis') 7) <tbody class="decade-section">…</tbody> aka getByText('1960s — 3 episodes23The Tomb') 8) <tbody class="decade-section">…</tbody> aka getByText('2020s — 3 episodes35The Power') 9) <tbody class="decade-section">…</tbody> aka getByText('2010s — 4 episodes4The Day of') 10) <tbody class="decade-section">…</tbody> aka getByText('2000s — 1 episode3The Empty') Call log: - waiting for locator('table tbody')

---

## Instructor Notes

AutoTest: 51% | T1=40/60 (67%) | T2=6/25 (24%) | T3=5/40 (13%) | Single HTTP source (expected)


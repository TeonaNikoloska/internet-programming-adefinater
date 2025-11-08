# Grading Breakdown - PR #21

**Student:** main
**Student ID:** 
**GitHub:** @ivanpine
**Alternative:** Doctor Who

---

## Score Summary

| Category | Score | Percentage |
|----------|-------|------------|
| **Tier 1** (Basic Functionality) | 51 / 60 | 85% |
| **Tier 2** (Edge Case Handling) | 6 / 25 | 24% |
| **Tier 3** (Advanced Features) | 10 / 15 | 67% |
| **Subtotal** | 51610 / 100 | |
| **Bonus Points** | +5 | |
| **Deductions** | - | |
| **Total Points** | 72 / 100 | |
| **FINAL GRADE** | **72%%** | |

---

## Complete Points Breakdown

| Status | Test | Tier | Max Pts | Earned |
|--------|------|------|---------|--------|
| ✅ | Data Loads Successfully | 1 | 10 | 10 |
| ✅ | Loading Indicator Shown | 1 | 3 | 3 |
| ✅ | All Required Columns Present | 1 | 15 | 15 |
| ✨ | Data Formatting (Extra) | 1 | 0 | 6 |
| ✅ | Semantic HTML Structure | 1 | 4 | 4 |
| ❌ | Clicking Headers Sorts Table | 1 | 8 | 0 |
| ❌ | Toggle Ascending/Descending | 1 | 4 | 0 |
| ✅ | Sort Direction Indicator | 1 | 3 | 3 |
| ✅ | Filter Input Field Exists | 1 | 5 | 5 |
| ✅ | Filter Actually Works | 1 | 5 | 5 |
|  | **─── TIER 1 SUBTOTAL ───** |  | 60 | 51 |
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
| ✅ | Grouping/Decade Display | 3 | 5 | 5 |
|  | **─── TIER 3 SUBTOTAL ───** |  | 15 | 10 |
| | | | | |
|  | **BASE SCORE** |  | 100 | 67 |
| ✨ | BONUS |  |  | +5 |
| | | | | |
| **═══** | **FINAL TOTAL** | ═══ | 100 | 72 |

---

## Error Log

- ⚠️ Clicking headers sorts table: locator.textContent: Error: strict mode violation: locator('table tbody tr:first-child td:first-child') resolved to 9 elements: 1) <td colspan="10">…</td> aka getByRole('cell').filter({ hasText: '1960s — 3 episodes23The Tomb' }) 2) <td>23</td> aka getByRole('cell', { name: '23' }) 3) <td>27</td> aka getByRole('cell', { name: '27' }) 4) <td>50</td> aka getByRole('cell', { name: '50' }) 5) <td>20</td> aka getByRole('cell', { name: '20', exact: true }) 6) <td>21</td> aka getByRole('cell', { name: '21' }).first() 7) <td>1</td> aka getByRole('cell', { name: '1', exact: true }).first() 8) <td>2</td> aka locator('tr:nth-child(5) > td > details > table > tbody > tr > td').first() 9) <td>-7</td> aka getByRole('cell', { name: '-7' }) Call log: - waiting for locator('table tbody tr:first-child td:first-child')
- ⚠️ Toggle ascending/descending: locator.textContent: Error: strict mode violation: locator('table tbody tr:first-child td:first-child') resolved to 9 elements: 1) <td colspan="10">…</td> aka getByRole('cell').filter({ hasText: '1960s — 3 episodes23The Tomb' }) 2) <td>23</td> aka getByRole('cell', { name: '23' }) 3) <td>27</td> aka getByRole('cell', { name: '27' }) 4) <td>50</td> aka getByRole('cell', { name: '50' }) 5) <td>20</td> aka getByRole('cell', { name: '20', exact: true }) 6) <td>21</td> aka getByRole('cell', { name: '21' }).first() 7) <td>1</td> aka getByRole('cell', { name: '1', exact: true }).first() 8) <td>2</td> aka locator('tr:nth-child(5) > td > details > table > tbody > tr > td').first() 9) <td>-7</td> aka getByRole('cell', { name: '-7' }) Call log: - waiting for locator('table tbody tr:first-child td:first-child')
- ⚠️ No "undefined" or "null" text visible: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 4 elements: 1) <tbody id="episodes-body">…</tbody> aka locator('#episodes-body') 2) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2000s — 1 episode3The Empty' }).getByRole('rowgroup') 3) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2010s — 4 episodes4The Day of' }).getByRole('rowgroup') 4) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2020s — 3 episodes35The Power' }).getByRole('rowgroup') Call log: - waiting for locator('table tbody')
- ⚠️ Empty arrays handled gracefully: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 4 elements: 1) <tbody id="episodes-body">…</tbody> aka locator('#episodes-body') 2) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2000s — 1 episode3The Empty' }).getByRole('rowgroup') 3) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2010s — 4 episodes4The Day of' }).getByRole('rowgroup') 4) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2020s — 3 episodes35The Power' }).getByRole('rowgroup') Call log: - waiting for locator('table tbody')
- ⚠️ Special characters render correctly: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 4 elements: 1) <tbody id="episodes-body">…</tbody> aka locator('#episodes-body') 2) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2000s — 1 episode3The Empty' }).getByRole('rowgroup') 3) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2010s — 4 episodes4The Day of' }).getByRole('rowgroup') 4) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2020s — 3 episodes35The Power' }).getByRole('rowgroup') Call log: - waiting for locator('table tbody')
- ⚠️ Missing/null values display placeholders: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 4 elements: 1) <tbody id="episodes-body">…</tbody> aka locator('#episodes-body') 2) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2000s — 1 episode3The Empty' }).getByRole('rowgroup') 3) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2010s — 4 episodes4The Day of' }).getByRole('rowgroup') 4) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2020s — 3 episodes35The Power' }).getByRole('rowgroup') Call log: - waiting for locator('table tbody')
- ⚠️ Nested data (award/series) formatted properly: locator.textContent: Error: strict mode violation: locator('table tbody') resolved to 4 elements: 1) <tbody id="episodes-body">…</tbody> aka locator('#episodes-body') 2) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2000s — 1 episode3The Empty' }).getByRole('rowgroup') 3) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2010s — 4 episodes4The Day of' }).getByRole('rowgroup') 4) <tbody>…</tbody> aka getByRole('group').filter({ hasText: '2020s — 3 episodes35The Power' }).getByRole('rowgroup') Call log: - waiting for locator('table tbody')

---

## Instructor Notes

AutoTest: 72% | T1=51/60 (85%) | T2=6/25 (24%) | T3=10/40 (25%) | Bonus: +5 | Multiple HTTP sources (6 sources) - BONUS!


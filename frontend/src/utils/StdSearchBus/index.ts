/**
 * @uuid         UTL-EVT-001
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Minimal window-CustomEvent pub/sub bus that lets two components without a shared parent (e.g. a nav button and a search popup) communicate without a state library.
 *
 * @whereToUse
 * Anywhere two loosely-coupled UI pieces need to signal each other across the component tree.
 *
 * @whenToUse
 * Use when introducing a state-management library would be overkill for a single fire-and-forget UI signal.
 */

// Small window-CustomEvent bus so pieces that don't share a parent
// (Navbar's mobile menu, the Projects page) can talk to each other
// without pulling in a state library. The mobile "search a project"
// button calls requestProjectSearch(); Projects.jsx listens with
// onProjectSearchRequest() and opens its popup.

const EVENT_NAME = 'novex:open-project-search'

/**
 * @uuid         UTL-EVT-001:requestProjectSearch
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Dispatches the shared window CustomEvent that asks a listener to open the project-search popup.
 */
/**
 * @uniqueid UTL-EVT-001:requestProjectSearch
 *
 * Fires the bus event. Safe to call even if no listener is mounted yet.
 */
export function requestProjectSearch() {
  window.dispatchEvent(new CustomEvent(EVENT_NAME))
}

/**
 * @uuid         UTL-EVT-001:onProjectSearchRequest
 * @author       NOVEx Engineering Tech
 * @date         2026/08/16
 * @dependsOn    none
 *
 * @description
 * Subscribes a handler to the bus event and returns an unsubscribe function.
 */
/**
 * @uniqueid UTL-EVT-001:onProjectSearchRequest
 *
 * @param handler - Called with no meaningful payload when the event fires.
 * @returns Cleanup function that removes the listener.
 */
export function onProjectSearchRequest(handler) {
  window.addEventListener(EVENT_NAME, handler)
  return () => window.removeEventListener(EVENT_NAME, handler)
}

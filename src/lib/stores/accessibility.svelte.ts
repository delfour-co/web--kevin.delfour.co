let panelOpen = $state(false);

export function getAccessibilityPanel() {
	return {
		get open() {
			return panelOpen;
		},
		set open(value: boolean) {
			panelOpen = value;
		},
		toggle() {
			panelOpen = !panelOpen;
		}
	};
}

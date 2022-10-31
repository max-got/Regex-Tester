/**
 * This action triggers a custom event on node entering/exiting the viewport.
 * example:
 * <p
 * 	use:inView
 * 	on:enter={() => console.log("enter")}
 * 	on:exit={() => console.log("exit")}
 * >
 * 
 * optional params { root, top, bottom }
 * top and bottom are numbers
 * use:inView={ bottom: 100 } // 100 pixels from bottom of viewport
 */


export default function inView(node: HTMLElement, params: { root?: Element | Document | null, top?: number, bottom?: number } = { root: null, top: 0, bottom: 0 }) {
	let observer: IntersectionObserver;

	const handleIntersect = (e: Array<IntersectionObserverEntry>) => {
		type V = 'enter' | 'exit';
		const v: V = e[0].isIntersecting ? 'enter' : 'exit';
		node.dispatchEvent(new CustomEvent(v));
	};

	const setObserver = ({ root = null, top = 0, bottom = 0 }: { root?: Element | Document | null, top?: number, bottom?: number }) => {
		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin: CSSRule["cssText"] = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
	};

	setObserver(params);

	return {
		update(params = { root: null, top: 0, bottom: 0 }) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}

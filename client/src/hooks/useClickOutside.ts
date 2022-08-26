import { RefObject, useEffect, useRef } from 'react';

type ListenerEvent = MouseEvent & {
  target: Element;
};

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
  eventType = 'click',
) => {
  // region *******************************DATA*********************************
  const handlerRef = useRef(callback);
  // endregion

  // region ******************************EFFECTS*******************************
  useEffect(() => {
    handlerRef.current = callback;
  });

  useEffect(() => {
    const listener = (event: ListenerEvent) => {
      if (ref && ref.current) {
        if (event.target.shadowRoot) {
          if (!event.target.shadowRoot.contains(ref.current)) {
            handlerRef.current(event);
          }
        } else if (!ref.current.contains(event.target)) {
          handlerRef.current(event);
        }
      }
    };

    document.addEventListener(eventType, listener as EventListener);

    document.addEventListener('touchstart', listener as EventListener);

    return () => {
      document.removeEventListener(eventType, listener as EventListener);

      document.removeEventListener('touchstart', listener as EventListener);
    };
  });
  // endregion
};

export default useClickOutside;

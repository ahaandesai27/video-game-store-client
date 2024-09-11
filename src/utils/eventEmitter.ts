const eventTarget = new EventTarget();

export const emitTokenChange = (token: string | null) => {
  eventTarget.dispatchEvent(new CustomEvent("tokenChange", { detail: token }));
};

export const onTokenChange = (callback: (token: string | null) => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail);
  };

  eventTarget.addEventListener("tokenChange", handler);

  return () => {
    eventTarget.removeEventListener("tokenChange", handler);
  };
};

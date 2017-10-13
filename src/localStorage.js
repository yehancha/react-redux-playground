export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState && serializedState !== null ?
      JSON.parse(serializedState) :
      undefined;
  } catch (e) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Could not save the state.', e);
  }
}

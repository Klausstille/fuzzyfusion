export const handleDrag = (
    positions: any,
    setPositions: any,
    ui: any,
    idx: number
) => {
    const updatedPositions = [...positions];
    updatedPositions[idx] = { x: ui.x, y: ui.y };
    setPositions(updatedPositions);
};

export const handleDragStop = (positions: any) => {
    localStorage.setItem("draggablePositions", JSON.stringify(positions));
};

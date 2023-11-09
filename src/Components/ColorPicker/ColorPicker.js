import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  return (
    <div>
      <SketchPicker
        color={selectedColor}
        onChange={(color) => onColorChange(color.hex)}
      />
    </div>
  );
};

export default ColorPicker;

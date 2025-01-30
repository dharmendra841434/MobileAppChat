import React from 'react';
import {Text} from 'react-native';
import appColors from '../constant/appColors';
import appFonts from '../constant/appFonts';

const CustomText = ({font = '', children, className = '', style, ...props}) => {
  let fontFamily;
  switch (font) {
    case 'bold':
      fontFamily = appFonts.Ubuntu.Bold;
      break;
    case 'boldItalic':
      fontFamily = appFonts.Ubuntu.BoldItalic;
      break;
    case 'medium':
      fontFamily = appFonts.Ubuntu.Medium;
      break;
    case 'mediumItalic':
      fontFamily = appFonts.Ubuntu.MediumItalic;
      break;
    case 'italic':
      fontFamily = appFonts.Ubuntu.Italic;
      break;
    case 'light':
      fontFamily = appFonts.Ubuntu.Light;
      break;
    case 'lightItalic':
      fontFamily = appFonts.Ubuntu.LightItalic;
      break;
    case 'jockey':
      fontFamily = appFonts.JockeyOne;
      break;
    default:
      fontFamily = appFonts.Ubuntu.Regular;
  }

  return (
    <Text
      className={` ${className} `}
      style={[{fontFamily: fontFamily}, style]}
      {...props}
      testID={className}>
      {children}
    </Text>
  );
};

export default CustomText;

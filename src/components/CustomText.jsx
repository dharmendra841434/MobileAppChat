import React from 'react';
import {Text} from 'react-native';
import appColors from '../constant/appColors';
import appFonts from '../constant/appFonts';

const CustomText = ({font = '', children, className = '', style, ...props}) => {
  let fontFamily;
  switch (font) {
    case 'bold':
      fontFamily = appFonts.Typo_Round_Bold;
      break;
    // case 'boldItalic':
    //   fontFamily = appFonts.;
    //   break;
    // case 'medium':
    //   fontFamily = appFonts.Ubuntu.Medium;
    //   break;
    // case 'mediumItalic':
    //   fontFamily = appFonts.Ubuntu.MediumItalic;
    //   break;
    // case 'italic':
    //   fontFamily = appFonts.Ubuntu.Italic;
    //   break;
    // case 'light':
    //   fontFamily = appFonts.Ubuntu.Light;
    //   break;
    case 'thin':
      fontFamily = appFonts.Typo_Round_Thin;
      break;
    // case 'jockey':
    //   fontFamily = appFonts.JockeyOne;
    //   break;
    default:
      fontFamily = appFonts.Typo_Round_Regular;
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

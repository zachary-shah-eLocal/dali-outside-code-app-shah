import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from './FormContainerStyles';

/**
 * This is meant to wrap the forms like login and register that need to be centered in the screen
 */

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <View style={styles.formContainerComponent}>{children}</View>
};

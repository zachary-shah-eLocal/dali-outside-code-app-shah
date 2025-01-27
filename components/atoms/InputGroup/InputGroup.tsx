import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { Text, TextInput, View } from "react-native";

import { styles } from "./InputGroupStyles";

type InputGroupProps = {
  name: string;
  children?: React.ReactNode;
  type?: "text" | "checkbox" | "multi-value" | "filter-select" | "password";
  placeholder?: string;
  label?: string;
  password?: boolean;
};

/**
 * Input Group built to work with Formik
 *
 */
export const InputGroup: React.FC<InputGroupProps> = ({
  name,
  type = "text",
  placeholder,
  password,
  label,
  children,
  ...rest
}) => {
  let fieldProps = {};
  let component = null;
  if (type === "text") {
    
    return (
      <Field name={name}>
        
        {({ field, form }: FieldProps) => {
          const errorMsg = form.errors[name] as string;

          return(
          <View style={styles.inputContainer} data-field-name={[name]}>
            <Text style={styles.label}>{label}</Text>
            
            <TextInput
              style={styles.input}
              onChangeText={form.handleChange(name)}
              onBlur={form.handleBlur(name)}
              value={form.values[name]}
              secureTextEntry={password}
              placeholder={placeholder}
              {...rest}
            />
            <View style={styles.errorContainer}>
            {(form.errors[name] as string) && (
              <Text style={styles.error}>{errorMsg}</Text>
            )}
            </View>
            </View>
          );
        }}
      </Field>
    );
  }
};

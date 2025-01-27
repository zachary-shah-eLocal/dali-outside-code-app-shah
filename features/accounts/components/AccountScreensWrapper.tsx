import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Container } from "../../../base/components/containers/Container";
import PageView from "../../../base/components/containers/PageView";
import BaseHeader from "../../../base/components/headers/BaseHeader";

type Props = {
  children?: React.ReactNode;
  screenName: string;
  screenTitle?: string;
  renderActionComponent?: React.ReactNode;
};

const AccountScreensWrapper = ({
  children,
  screenName,
  screenTitle,
  renderActionComponent,
}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <Container containerStyle={{ backgroundColor: "white" }}>
      <BaseHeader
        title={screenName}
        safeTopInset
        {...(renderActionComponent && { renderActionComponent })}
      />
      <PageView>
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            { paddingBottom: insets.top + insets.bottom + 60 },
          ]}
        >
          <Text style={styles.title}>{screenTitle}</Text>
          {children}
        </ScrollView>
      </PageView>
    </Container>
  );
};

export default AccountScreensWrapper;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
});

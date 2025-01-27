import React from "react";
import { SafeAreaView } from "react-native";
import { Container } from "../../../../base/components/containers/Container";
import PageView from "../../../../base/components/containers/PageView";
import Tabs from "../../../../base/components/tabs/Tabs";
import { Header } from "../../../../components/sections/Header";
import CallsList from "../../../../features/calls/components/CallsList";
import LeadsList from "../../../../features/leads/components/LeadsList";

type Props = {};

const tabs = [
  { label: "Recent Calls", tab: <CallsList /> },
  { label: "Recent Leads", tab: <LeadsList /> },
];

const SummaryScreen = () => {
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <PageView containerStyle={{ flex: 1 }}>
          <Tabs tabs={tabs} />
        </PageView>
      </SafeAreaView>
    </Container>
  );
};

export default SummaryScreen;

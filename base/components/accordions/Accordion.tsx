import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AnkerText from "../buttons/AnkerText";
import BaseCard from "../cards/BaseCard";
import Divider from "../Divider";

type AccordionProps = {
  children: React.ReactNode;
  renderExpandButton?: boolean;
};

type AccordionHeaderProps = {
  children: React.ReactNode;
};

type AccordionContentProps = {
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> & {
  Header: React.FC<AccordionHeaderProps>;
  Content: React.FC<AccordionContentProps>;
} = ({ children, renderExpandButton = true }) => {
  const [expanded, setExpanded] = React.useState(true);

  const header = React.Children.toArray(children).find(
    (child: any) => child.type === Accordion.Header
  );
  const content = React.Children.toArray(children).find(
    (child: any) => child.type === Accordion.Content
  );

  return (
    <View>
      <BaseCard
        containerStyles={
          expanded && { borderBottomEndRadius: 0, borderBottomStartRadius: 0 }
        }
      >
        <TouchableOpacity
          activeOpacity={renderExpandButton ? 0.7 : 1}
          // style={{ paddingBottom: 20 }}
          onPress={() => {
            if (renderExpandButton) return;
            setExpanded((prev) => !prev);
          }}
        >
          {header}
          {renderExpandButton && (
            <AnkerText
              style={{ marginTop: 10 }}
              label={expanded ? "View less" : "View more"}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
          )}
        </TouchableOpacity>
      </BaseCard>
      {expanded && (
        <BaseCard
          containerStyles={
            expanded && {
              borderTopEndRadius: 0,
              borderTopStartRadius: 0,
              paddingTop: 0,
            }
          }
        >
          <Divider />
          <View style={{ paddingTop: 15 }}>{content}</View>
        </BaseCard>
      )}
    </View>
  );
};

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children }) => {
  return <>{children}</>;
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
  return <>{children}</>;
};

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;

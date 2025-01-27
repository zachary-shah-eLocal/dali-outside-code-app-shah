import Accordion from "components/accordions/Accordion";
import BaseCard from "components/cards/BaseCard";
import { Container } from "components/containers/Container";
import CustomTable from "components/CustomTable";
import Divider from "components/Divider";
import BaseHeader from "components/headers/BaseHeader";
import AppLoader from "components/loaders/AppLoader";
import Map from "components/Map";
import MapView from "components/shared/MapView";
import BaseStatus from "components/statuses/BaseStatus";
import Text from "components/Text";
import useCampaignListing from "features/campaignListings/api/useCampaignListing";
import useCampaign from "features/campaigns/api/useCampaign";
import ScheduleAccordion from "features/campaigns/components/ScheduleAccordion";
import LeadsList from "features/leads/components/LeadsList";
import { Navigation } from "helpers/Navigationhelper";
import LocationIcon from "icons/account/LocationIcon";
import PhoneIcon from "icons/card/PhoneIcon";
import EditIcon from "icons/EditIcon";
import PhoneIconC from "icons/PhoneIconC";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "theme/colors";
import { format } from "utils/index";

const displayWithComma = (value: any) => {
  if (value) {
    return `${value}, `;
  }
  return "";
};

const formatValue = format;

const getSchedule = (campaign: any, campaignListing: any) => {
  if (campaignListing?.Ad_Campaign_Schedules__r) {
    return {
      records: campaignListing?.Ad_Campaign_Schedules__r.records,
      origin: "listing",
    };
  }
  if (campaign?.Ad_Campaign_Schedules__r) {
    return {
      records: campaign?.Ad_Campaign_Schedules__r.records,
      origin: "campaign",
    };
  }
  return null;
};

type Props = {
  route: any;
};

const ListingDetailsScreen = ({ route }: Props) => {
  const { campaignId, listingId } = route.params;

  const { data: campaign } = useCampaign(campaignId);
  const { data: campaignListing, isLoading } = useCampaignListing(
    campaignId,
    listingId
  );
  const schedule = getSchedule(campaign, campaignListing);

  const formattedAddress =
    displayWithComma(campaignListing?.Listing__r.Address_1__c) +
    displayWithComma(campaignListing?.Listing__r.Address_2__c) +
    displayWithComma(campaignListing?.Listing__r.City__c) +
    campaignListing?.Listing__r.State_or_Province__c +
    campaignListing?.Listing__r.Zip_Postal_Code__c;

  const getFormattedData = () => {
    const formattedData: any = [];
    schedule?.records?.forEach((row: any, index: any) => {
      let value = null;
      const { Start_Time_Slot_1__c, End_Time_Slot_1__c, Day_Of_Week__c } = row;
      if (
        Start_Time_Slot_1__c === "00:00:00.000Z" &&
        End_Time_Slot_1__c === "23:59:59.000Z"
      ) {
        value = "24 Hours";
      } else {
        const dateNotTime = new Date().toISOString().split("T")[0];
        const start = `${dateNotTime}T${Start_Time_Slot_1__c.split("Z")[0]}`;
        const end = `${dateNotTime}T${End_Time_Slot_1__c.split("Z")[0]}`;
        value = `${format.date(new Date(start), "p")} - ${format.date(
          new Date(end),
          "p"
        )}`;
      }
      formattedData.push([Day_Of_Week__c, value]);
    });
    return formattedData;
  };

  const handleEdit = () => {
    Navigation.navigate(Screens.EDIT_LOCATION_DETAILS_SCREEN, {
      id: campaignListing?.Listing__r?.Postgres_External_Key__c,
    });
  };

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader
        title="Ad Details"
        safeTopInset
        renderActionComponent={
          <View style={{ marginLeft: "auto" }}>
            <BaseStatus
              type={
                campaignListing?.Ad_Campaign_Listing_Status__c === "ACTIVE"
                  ? "success"
                  : "info"
              }
              label={campaignListing?.Ad_Campaign_Listing_Status__c}
            />
          </View>
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text style={styles.title}>
                {campaignListing?.Listing__r.Name}
              </Text>
              <TouchableOpacity onPress={handleEdit}>
                <EditIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.type}>Ad Details</Text>
            {}
          </View>
          <View style={{ gap: 8 }}>
            <View style={styles.row}>
              <LocationIcon />
              <Text>{formattedAddress}</Text>
            </View>
            <View style={styles.row}>
              <PhoneIconC color={"#0293D2"} />
              <Text>
                {formatValue["phoneNumber"](
                  campaignListing?.Forwarding_Phone__c
                )}
              </Text>
            </View>
          </View>
          <MapView
            zip={campaignListing?.Listing__r.Zip_Postal_Code__c}
            title="Map"
          />
          <Accordion renderExpandButton={false}>
            <Accordion.Header>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.accordionTitle}>Schedule</Text>
              </View>
            </Accordion.Header>
            <Accordion.Content>
              <View>
                <CustomTable data={getFormattedData()} />
              </View>
            </Accordion.Content>
          </Accordion>
        </View>
        <LeadsList />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 16,

    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  type: {
    color: Colors.gray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22.6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});

import Button from "components/buttons/Button";
import ArrowLeft from "icons/ArrowLeft";
import ArrowLeftLarge from "icons/ArrowLeftLarge";
import ArrowRight from "icons/ArrowRight";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "theme/colors";

type Props = {
  totalPages: number;
  currentPage: number;
  isLast: boolean;
  isFirst: boolean;
  setPage: (page: number) => void;
  disabled?: boolean;
};

const Pagination = (props: Props) => {
  const { totalPages, currentPage, setPage, disabled } = props;

  const handlePage = (page: number) => {
    setPage(page);
  };

  const pagesList: number[] = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: Set<number> = new Set();

    // Always include the first page
    pages.add(1);

    // Include pages around the current page (1 before and 1 after)
    if (currentPage > 2) {
      pages.add(currentPage - 1);
    }
    pages.add(currentPage);
    if (currentPage < totalPages - 1) {
      pages.add(currentPage + 1);
    }

    // Always include the last page
    pages.add(totalPages);

    // Convert Set to Array and sort it
    return Array.from(pages).sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  if (totalPages < 2) return null;
  return (
    <View style={styles.container}>
      {pagesList?.map((page: number, index: number) => (
        <Button
          key={index.toString()}
          fullWidth={false}
          title={page?.toString()}
          containerStyle={currentPage !== page ? styles.button : {}}
          textsStyle={currentPage !== page ? styles.buttonText : {}}
          disabled={disabled || currentPage === page}
          onPress={() => handlePage(page)}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  button: {
    backgroundColor: "white",
  },
  buttonText: {
    color: Colors.black,
  },
});

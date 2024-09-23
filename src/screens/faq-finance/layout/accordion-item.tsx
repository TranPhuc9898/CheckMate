import React, { FunctionComponent, ComponentProps, useContext } from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, PriceItem, Icon } from "components";
import Accordion from "react-native-collapsible/Accordion";
import styles from "./styles";
import { colors } from "libs/theme";

interface IAccordionItem extends ComponentProps<typeof Card> {
  data: any;
}

const AccordionItem: FunctionComponent<IAccordionItem> = ({ data }) => {
  const [activeSection, setActiveSection] = React.useState([]);
  const I18n = useContext(LocalizationContext);
  const _renderHeader = (section, i, isActive) => {
    return (
      <Box
        style={[
          styles.header,
          i !== 0 ? { borderTopWidth: 1, borderTopColor: colors.grey4 } : {},
        ]}
      >
        <Box flex>
          <Text
            center
            style={styles.headerText}
          >
            {section.title}
          </Text>
          <Box
            flex
            center
            row
          >
            <PriceItem
              cost={section?.value}
              currencyStyle={styles.currencyStyle}
              priceStyle={styles.mainAccountStyle}
            />
            <Icon
              style={styles.styleIcon}
              color="grey2"
              name={isActive ? "icDown" : "icUp"}
              size="m"
            />
          </Box>

          {section?.numberTasks ? (
            <Text
              center
              color="success"
              style={styles.headerText}
            >
              {I18n.t("TAB_ACCOUNT.NUMBER_ACCEPT_TASK", {
                numberTasks: section?.numberTasks,
              })}
            </Text>
          ) : null}
        </Box>
      </Box>
    );
  };

  const _renderContent = (section, i) => {
    return (
      <Box
        flex
        center
      >
        <Box
          style={{ width: "70%", height: 1, backgroundColor: colors.grey4 }}
        ></Box>
        <Box style={styles.boxContent}>
          <Text>
            <Text
              bold
              color="black"
              style={styles.headerText}
            >
              {section.title}{" "}
            </Text>
            <Text style={styles.headerText}>{section.content}</Text>
          </Text>
        </Box>
      </Box>
    );
  };
  return (
    <Card>
      <Accordion
        activeSections={activeSection}
        sections={data}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        duration={400}
        onChange={(active) => setActiveSection(active)}
      />
    </Card>
  );
};

export default AccordionItem;

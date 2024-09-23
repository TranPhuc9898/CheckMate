import { LocalizationContext } from "libs/context";
import { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box, Card, Text, TransitionView } from "components";
import getBPointTransactionAPI, { IGetBPointTransaction } from "apis/benefit/get-bpoint-transactions";
import { IRespond, formatDate, getUserIdGlobal, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import styles from "./styles";
import _ from "lodash";

const LIMIT_NUMBER_GET_TRANSACTION = 20;
const TYPE_USED_BPOINT = "C";

const UsedBPoint = () => {
  const I18n = useContext(LocalizationContext);
  const [page, setPage] = useState(1);
  const [lisTransaction, setLisTransaction] = useState([]);
  const [isGetAllData, setIsGetAllData] = useState(false);

  const _initData = async () => {
    // Check data is full, no call api, avoid spam server
    if (isGetAllData) {
      return null;
    }
    // Hide loading
    _.isEmpty(lisTransaction) ? store.dispatch(setLoading(true)) : null;
    // Init params
    const params: IGetBPointTransaction = {
      taskerId: getUserIdGlobal(),
      transactionType: TYPE_USED_BPOINT,
      page: page,
      limit: LIMIT_NUMBER_GET_TRANSACTION,
    };
    // Call api get list bReward
    const result: IRespond = await getBPointTransactionAPI(params);
    // Hide loading
    store.dispatch(setLoading(false));
    // Error -> Handle error
    if (!result.isSuccess) {
      // Handle error
      return handleError(result?.error);
    }
    // Get data from api
    const dataResult = _.get(result, "data", []);
    // Merge new incentive to incentiveData
    const dataMerged = [...lisTransaction, ...dataResult];
    // Data is full, set incentive to reducer
    if (
      dataResult.length === 0 ||
      dataResult.length < LIMIT_NUMBER_GET_TRANSACTION ||
      dataMerged.length < LIMIT_NUMBER_GET_TRANSACTION
    ) {
      setIsGetAllData(true);
    }
    // After each data retrieval, the page will be added 1
    setPage(page + 1);
    // Set data new data incentive if success
    setLisTransaction(dataMerged);
  };

  // Get data transaction
  useEffect(() => {
    _initData();
  }, [])

  // Check empty transaction
  if (_.isEmpty(lisTransaction)) {
    return (
      <Box
        center
        style={styles.boxEmptyData}
      >
        <Text testID="txtEmptyTransaction">
          {I18n.t("BREWARD.EMPTY_TRANSACTION")}
        </Text>
      </Box>
    );
  }

  // Hiển thị Footer
  const _renderFooter = () => {
    // Nếu đã load hết data -> return
    if (isGetAllData) {
      return null;
    }
    return (
      <Box center style={styles.boxFooter}>
        <TouchableOpacity onPress={_initData}>
          <Text italic style={styles.txtLink} color="secondary">{I18n.t("BREWARD.TITLE_BUTTON_VIEW_MORE")}</Text>
        </TouchableOpacity>
      </Box>
    )
  }

  // Render transaction
  const _renderTransaction = () => {
    // Group transaction by date
    const groupTransaction = _.groupBy(lisTransaction, (item) => {
      return formatDate(item.createdAt, "date");
    });
    // Kiểm tra có transaction không
    if (_.isEmpty(groupTransaction)) {
      return null;
    }
    // Hiển thị danh sách
    return Object.keys(groupTransaction)?.map((key) => (
      <Box
        key={key}
        style={styles.boxTransaction}
      >
        <Text
          bold
          style={styles.titleDate}
          testID={"date_" + key}
        >
          {key}
        </Text>
        {groupTransaction[key]?.map((item, index) => (
            <TransitionView
              key={"itemTransaction_" + index}
              index={index}
            >
              <Card testID={"itemTransaction_" + index}>
                <Box row between alignCenter>
                  <Box>
                    <Text style={styles.txtStyle}>{item?.reason}</Text>
                    <Text fontSize="m" color="grey1">{formatDate(item?.createdAt)}</Text>
                  </Box>
                  <Box row alignCenter>
                    <Text variant="h3" color="error">-{item?.point}</Text>
                    <Text fontSize="m" color="grey1" style={styles.txtPaddingLeft}>bPoints</Text>
                  </Box>
                </Box>
              </Card>
            </TransitionView>
          ))}
      </Box>
    ))
  };

  return (
    <ScrollView contentContainerStyle={styles.containerStyle}>
      {_renderTransaction()}
      {_renderFooter()}
    </ScrollView>
  );
};
export default UsedBPoint;
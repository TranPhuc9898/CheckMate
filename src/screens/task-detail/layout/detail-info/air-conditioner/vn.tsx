/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-16 17:07:13
 * @modify date 2023-03-16 17:07:13
 * @desc [Air conditioner detail]
 */

import { FC } from "react";
import { Box } from "@src/components";
import _ from "lodash";
import { IDetailInfo } from "..";
import TotalUnit from "./components/total-unit";
import Details from "./components/detail";
import { VIETNAM } from "libs/constants";

const AirConditionerDetail: FC<IDetailInfo> = ({ detail }) => {
  if (_.isEmpty(detail)) {
    return null;
  }

  // Tính số máy
  let total = 0;
  detail.map((item) => (total += item.quantity));

  return (
    <Box>
      {/* Render number units */}
      <TotalUnit total={total} />

      {/* Render detail */}
      <Details
        detail={detail}
      />
    </Box>
  );
};

export default AirConditionerDetail;

/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 10:20:37
 * @modify date 2023-03-17 10:20:37
 * @desc [Home cooking detail]
 */

import { FC } from "react";
import { Box } from "@src/components";
import Dish from "./components/dish";
import Diner from "./components/diner";
import EatingTime from "./components/eating-time";
import BudgetGoMarket from "./components/go-market";
import { IDetailInfo } from "..";
import Taste from "./components/taste";
import Dessert from "./components/dessert";

const CookingDetail: FC<IDetailInfo> = ({ detail }) => {
  const {
    numberDish,
    numberEater,
    eatingTime,
    haveFruit,
    isGoMarket,
    budgetGoMarket,
    taste,
    dishDetail,
  } = detail;
  return (
    <Box>
      {/* Diner */}
      <Diner numberEater={numberEater} />

      {/* Eating time */}
      <EatingTime eatingTime={eatingTime} />

      {/* BudgetGoMarket */}
      <BudgetGoMarket
        isGoMarket={Boolean(isGoMarket)}
        budgetGoMarket={budgetGoMarket}
      />
      <Taste nameTaste={taste?.name} />
      <Dessert haveFruit={Boolean(haveFruit)} />
      {/* Dish */}
      <Dish
        numberDish={numberDish}
        dishDetail={dishDetail || []}
      />
    </Box>
  );
};

export default CookingDetail;

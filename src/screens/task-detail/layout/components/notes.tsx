/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render note]
 */

import React from "react";

import { Alert, Button, Card, Text } from "@src/components";
import { useI18n } from "hooks/translation";
import { statusTask } from "libs/config";
import { replaceInvalidCharacterToString } from "libs/helper";

import styles from "../styles";
import ContentModalFullNotes from "./content-modal-notes";

interface INoteDetail {
  dataTask: any;
  setDataTask: (data: any) => void;
}

const NotesDetail: React.FunctionComponent<INoteDetail> = ({ dataTask, setDataTask }) => {
  const { t } = useI18n();

  if (!dataTask?.note) {
    return null;
  }

  let newNote = dataTask?.note;
  if (dataTask?.status !== statusTask.confirmed) {
    newNote = replaceInvalidCharacterToString(dataTask?.note);
  }

  const _seeFullNote = () => {
    return Alert.alert.open({
      title: "TASK_DETAIL.NOTES_TITLE",
      message: (
        <ContentModalFullNotes
          dataTask={dataTask}
          setDataTask={setDataTask}
        />
      ),
      actions: [{ text: "DIALOG.BUTTON_CLOSE", testID: "btnDone" }],
    });
  };

  return (
    <Card>
      <Text
        variant="h4"
        color="primary"
      >
        {t("TASK_DETAIL.NOTE_LABEL")}
      </Text>
      <Text
        numberOfLines={3}
        style={styles.txtNote}
      >
        {newNote}
      </Text>
      <Button
        testID="btnSeeFullNote"
        size="md"
        buttonStyle={styles.btnSeeFullNote}
        onPress={_seeFullNote}
      >
        <Text
          bold
          color="white"
        >
          {t("TASK_DETAIL.BUTTON_SEE_FULL_NOTE")}
        </Text>
      </Button>
    </Card>
  );
};

export default NotesDetail;

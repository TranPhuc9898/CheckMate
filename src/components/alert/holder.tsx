export default class AlertHolder {
  /**
   * ### Method: open(info, onlyKey), close()
   * ### info:
   * - **title**: tiêu đề thông báo, mặc định hiện chữ Thông báo
   * - **message**: nội dung của thông báo
   * ```
   *  type 1: string - key trong localization
   *  type 2: [string] - key trong localization
   *  type 3: [{text, onPress, style, notUsedI18n}]
   *  type 4: Node
   * ```
   * - **actions**: Các nút của thông báo
   * ```
   *  text: string - key trong localization
   *  onPress: function - mặc định sẽ đóng thông báo
   *  style: ok | cancel - màu của nút
   * ```
   * 
   * ### onlyKey true nếu gọi Alert ở ngoài Component
   * ### Event: onClosed - đóng thông báo 
   * 
   * ### Ví dụ
   * 1. Mở cơ bản, đã có tiêu đề Thông báo và nút Đóng
   *    Alert.alert.open({title: "hello"})
   * 2. Nâng cao
   * ```
   * Alert.alert.open({
      title: DIALOG.TITLE_INFORMATION",
      message: ["DIALOG.BUTTON_SEE"],
      actions: [
        {
          text: "DIALOG.BUTTON_CLOSE",
        },
        {
          text: "DIALOG.BUTTON_ACCEPT",
          onPress: () => {
          },
          style: "cancel",
        },
      ],
      onClosed: () => alert('đã đóng xong alert')
    }, true);
   * ```

    3. Nâng cao message với I18n và params

    ```
    Khi onlyKey = true
    [{text: "DIALOG.BUTTON_SEE", params: {t: "param here"}}]
    Hoặc
    {text: "DIALOG.BUTTON_SEE", params: {t: "param here"}}
    
    Khi onlyKey = false
    [{text: I18n.t("DIALOG.BUTTON_SEE"), notUsedI18n: true}]
    ```
   */
  static alert: any;
  static setAlert(alert) {
    this.alert = alert;
  }
  static getAlert() {
    return this.alert;
  }
}

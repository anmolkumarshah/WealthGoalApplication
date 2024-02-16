import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../asset/logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    padding: 5,
    marginLeft: "20vh",
    fontSize: "24px",
  },
  dateTime: {
    // float : 'right',
    fontSize: "10px",
    marginLeft: "5vh",
    color: "grey",
  },
  titleBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "10vh",
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 2,
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    fontSize: "10px",
    marginLeft: 10,
    borderBottom: "1px",
    width: "97%",
    padding: "8px",
    marginBottom: 15,
  },
  fieldValue: {
    fontSize: "12px",
  },
  uservalue: {
    color: "teal",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 12,
    left: 20,
    right: 20,
    textAlign: "center",
    color: "grey",
    padding: 5,
  },
  goalContainer: {
    marginBottom: 17,
    padding: 10,
    border: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f0f5f5",
  },
  goaltitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  details: {
    fontSize: 10,
    marginBottom: 5,
  },
  pageBreak: {
    flex: 1,
    flexDirection: "column",
    pageBreakBefore: "auto",
    pageBreakAfter: "auto",
  },
});

const PdfFile = ({ data }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleBlock}>
          <Text style={styles.dateTime}>
            Report Generated on : {formattedDate} {formattedTime}
          </Text>
        </View>
        <View style={styles.fields}>
          <Image style={styles.image} src={logo} />
          <View>
            <Text style={styles.fieldValue}>Wealth Goal Application</Text>
            <Text style={styles.fieldValue}>virtusa.com</Text>
            <Text style={styles.uservalue}>
              Hyderabad | Chennai | Nagpur | Chandrapur
            </Text>
          </View>
        </View>
        <View style={{ padding: "10%" }}>
          <Text style={styles.details}>{data}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfFile;

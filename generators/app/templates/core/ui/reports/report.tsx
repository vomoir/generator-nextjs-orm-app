import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  Note,
} from '@react-pdf/renderer';
import CustomersTable from '../customers/table';
import { fetchAllCustomers, fetchFilteredCustomers } from '@/<%= srcPath %>/lib/data';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 12,
    gap: 6,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCell: {
    marginVertical: 5,
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    fontSize: 12,
  },
});

// Create Document Component
//async function MyDocument() {
const MyDocument = async () => {
  // const customers = await fetchAllCustomers();
  // console.log(`Got Customers! ${customers.length}`);

  return (
    <Document pageMode="fullScreen" pageLayout="singlePage">
      <Page size="A4" wrap>
        <View style={styles.section}>
          <Text style={styles.heading}>Pre Start Checklist</Text>
          <View style={styles.sectionHeader}>
            <Text>Customers!</Text>
            <Text>Make/Model/Type:</Text>
            <Text>Date:</Text>
            <Text>Company: </Text>
            <Text>Assessor:</Text>
          </View>
          {/* <View style={styles.section}>
            {customers?.map((customer) => (
              <View style={styles.table} key={customer.id}>
                <Text>{customer.name}</Text>
                <View style={styles.tableRow}>
                  <View
                    style={[
                      styles.tableCell,
                      { width: '85%', textAlign: 'left', paddingRight: 8 },
                    ]}
                  >
                    <Image src={customer.image_url} />
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{customer.name}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{customer.email}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View> */}
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;

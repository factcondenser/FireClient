/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// TODO: Update react-navigation to v5 and use w/ hooks

import React, {useEffect, useState} from 'react';
import {Button, Picker, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [authToken, setAuthToken] = useState();
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState('');

  function computeHeaders(opts) {
    return {
      Authorization: `Bearer ${authToken}`,
      'User-Email': email,
      ...opts,
    };
  }

  async function login() {
    try {
      const res = await fetch('http://localhost:3000/api/v1/auth_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: {email, password}}),
      });
      const data = await res.json();
      console.log('LOGIN DATA:');
      console.log(data);
      setAuthToken(data.auth_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    const headers = computeHeaders();

    try {
      const res = await fetch('http://localhost:3000/api/v1/auth_token', {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      console.log('LOGOUT DATA:');
      console.log(data);
      setAuthToken(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function getExpenses() {
    const headers = computeHeaders();

    try {
      const res = await fetch('http://localhost:3000/api/v1/expenses', {
        headers,
      });
      const data = await res.json();
      console.log('GET INDEX DATA:');
      console.log(data);
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getExpense(id) {
    const headers = computeHeaders();

    try {
      const res = await fetch(`http://localhost:3000/api/v1/expense/${id}1`, {
        headers,
      });
      const data = await res.json();
      console.log('GET SHOW DATA:');
      console.log(data);
      const newExpenses = expenses.map(expense => {
        return expense.id === id ? data : expense;
      });
      setExpenses(newExpenses);
    } catch (error) {
      console.error(error);
    }
  }

  async function postExpense() {
    const headers = computeHeaders({'Content-Type': 'application/json'});
    const expenseParams = {
      expense: {
        expense_category_id: '2',
        amount: '1',
        description: 'Shtuffy Rights',
      },
    };

    try {
      const res = await fetch('http://localhost:3000/api/v1/expenses', {
        method: 'POST',
        headers,
        body: JSON.stringify(expenseParams),
      });
      const data = await res.json();
      console.log('POST DATA:');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function patchExpense(id) {
    const headers = computeHeaders({'Content-Type': 'application/json'});
    const expenseParams = {
      expense: {
        expense_category_id: '5',
        amount: '2.40',
        description: 'Dummy Rights',
      },
    };

    try {
      const res = await fetch(`http://localhost:3000/api/v1/expenses/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(expenseParams),
      });
      const data = await res.json();
      console.log('PATCH DATA:');
      console.log(data);
      getExpenses();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExpense(id) {
    const headers = computeHeaders();

    try {
      const res = await fetch(`http://localhost:3000/api/v1/expenses/${id}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      console.log('DELETE DATA:');
      console.log(data);
      getExpenses();
    } catch (error) {
      console.error(error);
    }
  }

  function renderExpenses(expenses) {
    return expenses.map(expense => (
      <Text key={expense.id}>
        {`Category: ${expense.expense_category.name}, Amount: $${expense.amount.cents / 100.0}, Description: ${
          expense.description
        }`}
      </Text>
    ));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button title="Login" onPress={login} />
              <Button title="GET Expenses" onPress={getExpenses} />
              <Button title="GET Expense" onPress={getExpense} />
              <Button title="POST Expense" onPress={postExpense} />
              <Button title="PATCH Expense" onPress={() => patchExpense(53)} />
              <Button title="DELETE Expense" onPress={() => deleteExpense(53)} />
              <Button title="Logout" onPress={logout} />
              {renderExpenses(expenses)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView> */}
      <View style={styles.login}>
        <Button title="Login" onPress={login} />
        <Button title="Logout" onPress={logout} />
      </View>
      <View style={styles.newExpense}>
        <View>
          {/* <Picker placeholder="Category" /> */}
          <Input placeholder="Amount" />
          <Input placeholder="Description" />
        </View>
        {/* <TextInput placeholder="Amount" onChangeText={text => setText(text)} />
        <Text style={{padding: 10, fontSize: 42}}>
          {text
            .split(' ')
            .map(word => word && '🍕')
            .join(' ')}
        </Text> */}
        {/* <View style={{height: 200, width: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 200, width: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 200, width: 50, backgroundColor: 'steelblue'}} />
        <View style={{height: 200, width: 50, backgroundColor: 'red'}} />
        <View style={{height: 200, width: 50, backgroundColor: 'yellow'}} />
        <View style={{height: 200, width: 50, backgroundColor: 'green'}} /> */}
      </View>
      {/* <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View> */}
      {/* <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  login: {
    marginTop: 50,
  },
  newExpense: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

export default App;

import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  children: React.ReactNode;
  name: string;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  name: string;

  constructor(props: Props) {
    super(props);
    this.name = props.name;
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <Icon size={96} color={MD3Colors.primary20} name="alert-octagon" />
          <Text style={styles.text}>{`Failed to load ${this.name}`}</Text>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: MD3Colors.primary20,
    textAlign: 'center',
  },
});

export default ErrorBoundary;

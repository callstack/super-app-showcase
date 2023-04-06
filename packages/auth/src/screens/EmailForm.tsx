import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';

const consentText = `I agree to receive other communication from Callstack.`;

const formAPIEndpoint =
  'https://api.hsforms.com/submissions/v3/integration/submit/5711799/28bf1421-72c2-4b33-b83d-1baee932c552';

async function sendFormData({
  email,
  firstname,
  lastname,
  onSuccess,
}: {
  email: string;
  firstname: string;
  lastname: string;
  onSuccess: (message: string) => void;
}) {
  const data = {
    submittedAt: Date.now(),
    fields: [
      {name: 'firstname', value: firstname},
      {name: 'lastname', value: lastname},
      {name: 'email', value: email},
    ],
    context: {
      pageName: 'Super App',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: consentText,
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: consentText,
          },
        ],
      },
    },
  };

  const response = await fetch(formAPIEndpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  const res = (await response.json()) as {
    inlineMessage: string;
  };

  onSuccess(res.inlineMessage.replace('<p>', '').replace('</p>', ''));
}

export const EmailForm = () => {
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={{padding: 16}}>
      <Text variant="headlineSmall">Learn More About Super Apps</Text>
      <Text style={{paddingVertical: 8}}>
        We'd like to know your feedback and how we can further improve the DX of
        Super Apps powered by Re.Pack. If you enjoy this, please subscribe to
        learn more about super apps.
      </Text>
      <TextInput
        mode="outlined"
        label="First Name*"
        onChange={event => {
          setFirstname(event.nativeEvent.text);
        }}
      />
      <TextInput
        mode="outlined"
        label="Last Name*"
        onChange={event => {
          setLastname(event.nativeEvent.text);
        }}
      />
      <TextInput
        mode="outlined"
        label="Company Email*"
        onChange={event => {
          setEmail(event.nativeEvent.text);
        }}
      />
      <View style={styles.consentLabel}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text variant="labelSmall" style={{flex: 1}}>
          {consentText}
        </Text>
      </View>
      <Text variant="bodySmall">
        You can unsubscribe from these communications at any time. For more
        information on how to unsubscribe, our privacy practices, and how we are
        committed to protecting and respecting your privacy, please review our{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() =>
            Linking.openURL('https://callstack.com/privacy-policy/')
          }>
          Privacy Policy
        </Text>
        .
      </Text>
      {successMessage !== '' ? (
        <View style={styles.successMessageContainer}>
          <Text>{successMessage}</Text>
        </View>
      ) : (
        <View style={{paddingTop: 16}}>
          <Button
            mode="contained"
            disabled={!checked || !email || !firstname || !lastname}
            onPress={() => {
              sendFormData({
                email,
                firstname,
                lastname,
                onSuccess: setSuccessMessage,
              });
            }}>
            Learn more
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  consentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  successMessageContainer: {
    paddingTop: 8,
  },
});

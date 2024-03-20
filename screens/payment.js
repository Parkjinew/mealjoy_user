import React from 'react';
import IMP from 'iamport-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserCode } from './utils';
import Loading from './Loding';
import { IMPConst } from 'iamport-react-native';

export default function Payment({navigation }) {
const params = {
    pg:"html5_inicis",
    pay_method: "card",
    merchant_uid: "test1'",
    name:"name",
    amount:10000,
    app_scheme: 'exampleformanagedexpo',
    buyer_name: "name",
    buyer_tel: "010",
    buyer_email: "@",
    m_redirect_url: IMPConst.M_REDIRECT_URL,
  }

  const userCode = getUserCode(params.pg);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <IMP.Payment
        userCode={userCode}
        // tierCode={tierCode}
        loading={<Loading />}
        data={params}
        callback={(response) => navigation.replace('PaymentResult', response)}
      />
    </SafeAreaView>
  );
}
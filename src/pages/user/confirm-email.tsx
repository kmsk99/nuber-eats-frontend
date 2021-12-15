import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
import {
    verifyEmail,
    verifyEmailVariables,
} from '../../__generated__/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`;

export const ConfirmEmail = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const history = useNavigate();
    const onCompleted = (data: verifyEmail) => {
        console.log(data);
        const {
            verifyEmail: { ok },
        } = data;
        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                },
            });
            history('/');
        }
    };
    const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
        VERIFY_EMAIL_MUTATION,
        {
            onCompleted,
        }
    );
    useEffect(() => {
        const [, code] = window.location.href.split('code=');
        verifyEmail({
            variables: {
                input: {
                    code,
                },
            },
        });
    }, [verifyEmail]);
    return (
        <div className="flex flex-col items-center justify-center mt-52">
            <h2 className="mb-1 text-lg font-medium">Confirming email...</h2>
            <h4 className="text-sm text-gray-700">
                Please wait, don't close this page...
            </h4>
        </div>
    );
};

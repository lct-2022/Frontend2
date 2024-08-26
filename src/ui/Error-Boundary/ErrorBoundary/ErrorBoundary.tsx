import React, {ErrorInfo} from 'react';
import ErrorComponent from '../ErrorComponent';

import {Props, State} from './types'

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Логируем ошибку
        console.info({error, errorInfo});
    }

    render() {
        const {children} = this.props;

        if (this.state.error) {
            return <ErrorComponent/>;
        }

        return children;
    }
}
import React, { useState, useEffect, useContext } from 'react'
import {
    useCollection,
    getDocumentsDataWithId,
    getData,
    DocumentData,
    QuerySnapshot,
} from './Firebase'
import { ActivityIndicator, Container, DisplayError, Page, ThemeContext } from '../components'
import { FirebaseError } from './Firebase'
import Message from '../messenger/Message'

interface Props<T> {
    collectionPath: string
    orderBy?: string
    limitLength?: number
    initialNumToRender?: number
    autoScrollToEnd?: boolean
}

export default function _<T>({
    collectionPath,
    orderBy,
    limitLength,
    initialNumToRender,
    autoScrollToEnd,
    ...restProps
}: Props<T>) {
    const [snapshot, loadingCollection, errorCollection] = useCollection(collectionPath)
    const [messages, setMessages] = useState([])
    const [loadingData, setDataLoading] = useState(true)
    const [errorData, setDataError] = useState(false)
    const { activeTheme } = useContext(ThemeContext)

    const fetchData = () => {
        const querySnapshot = snapshot as QuerySnapshot<DocumentData>
        getData(querySnapshot, orderBy, limitLength)
            .then((documentRef) => {
                // @ts-ignore
                setMessages(getDocumentsDataWithId(documentRef))
                setDataLoading(false)
            })
            .catch((e) => {
                setDataError(e)
                setDataLoading(false)
            })
    }

    const loadMoreMessages = () => {
        console.log('loadMoreMessages() : Start')
        //setRefreshing(true)
    }

    useEffect(() => {
        if (!loadingCollection && !errorCollection && snapshot)
            fetchData()
    }, [snapshot])

    if (loadingCollection || loadingData)
        return <ActivityIndicator size='gigantic' fullscreen />
    if (errorCollection || errorData) {
        const error = (errorCollection === true ? new Error('Unknown Firebase Error') :
            (errorCollection !== undefined ? errorCollection as Error : undefined) ||
            (errorData === true ? new Error('Unknown Firebase Error') : undefined))
        return (
            <DisplayError
                permissionDenied={
                    (errorCollection as FirebaseError)?.code === 'permission-denied'
                }
                error={error}
            />
        )
    }
    return (
        <ul>
            {
                console.log(messages)
            }
            { messages.map((message, ind) =>
                <li style={{ textDecoration: 'none'}}><Message item={message} /></li>
            )}
        </ul>
    )
    // return (
    //     <FlatList<T>
    //         style={{ width: '100%' }}
    //         viewStyle={{ alignItems: 'baseline' }}
    //         renderItem={renderItem}
    //         data={messages}
    //         onStartReached={loadMoreMessages}
    //         autoScrollToEnd={autoScrollToEnd}
    //         {...restProps}
    //     />
    // )
}

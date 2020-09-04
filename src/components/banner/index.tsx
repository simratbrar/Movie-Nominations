import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import { NOMINATION_LIMIT } from '../../constants/constants';

const Banner:React.FC=()=>{
    const {movieStore} =useStores();
    const [showState,setShowState] = useState(movieStore.nominationList.length===NOMINATION_LIMIT);

    useEffect(()=>{
        setShowState(movieStore.nominationList.length===NOMINATION_LIMIT);
    },[movieStore.nominationList.length]);
    return(
            <Toast show={showState} animation={false} onClose={()=>setShowState(false)} style={{
                                                                                position: 'fixed',
                                                                                top: 0,
                                                                                right: 0,
                                                                                zIndex: 100,
                                                                            }}>
                <Toast.Header>
                    <strong className="mr-auto">Notification</strong>
                    <small>Success!</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you have successfully created your nomination List!
                    You can share the link to your nomination list now.
                </Toast.Body>
            </Toast>
    );
}

export default observer(Banner);
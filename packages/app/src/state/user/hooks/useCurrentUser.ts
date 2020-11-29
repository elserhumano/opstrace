/**
 * Copyright 2020 Opstrace, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useEffect } from "react";
import { useDispatch, useSelector, State } from "state/provider";
import { subscribe, unsubscribe } from "../actions";
import getSubscriptionID from "state/utils/getSubscriptionID";

export const getCurrentUser = (state: State) => state.users.currentUser;
export const getCurrentUserLoaded = (state: State) =>
  state.users.currentUserLoaded;

export function useCurrentUserLoaded() {
  return useSelector(getCurrentUserLoaded);
}

/**
 * Subscribes to users and will update on
 * any changes. Automatically unsubscribes
 * on unmount.
 */
export default function useCurrentUser() {
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const subId = getSubscriptionID();
    dispatch(subscribe(subId));

    return () => {
      dispatch(unsubscribe(subId));
    };
  }, [dispatch, user?.email]);

  return user;
}
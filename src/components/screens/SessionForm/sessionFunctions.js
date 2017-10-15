import { NavigationActions } from 'react-navigation'

export const resetNavigateHome = () => {
  const resetNavigateHomeAction = NavigationActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName: 'Home' }) ]
  })
  const { dispatch } = this.props.navigation;
  dispatch(resetNavigateHomeAction)
}

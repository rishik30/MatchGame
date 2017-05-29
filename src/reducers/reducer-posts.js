import {FETCH_POSTS} from '../actions/action-types'
import {DISPLAY_POST} from '../actions/action-types'

export default function(state = {}, action) {
    switch(action.type) {

        case FETCH_POSTS:
            console.log('ACTION', action)
            let allPosts = {}
            action.payload.forEach(function(post, i) {
                allPosts[post.id] = post
            })
            return allPosts
            break;

        case DISPLAY_POST:
            console.log('BLOG DATA', action.payload)
            return action.payload

        default: return state
    }
}

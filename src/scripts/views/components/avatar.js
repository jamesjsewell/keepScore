import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'

const AvatarComponent = React.createClass({

	
	_handleClick: function(evt){

		evt.preventDefault()
		STORE._set({last_selected_input: evt.target})
		
	},

	render: function(){

		if(this.props.imgUrl != undefined & this.props.player != undefined){

			var imgUrl = this.props.imgUrl

			var playerName = this.props.player.name
		
			return(

				<div className='create-match-wrapper'>
					
				</div>

			)

		}
	
		else{

			if(this.props.player != undefined){
				
				return(

					<div className='create-match-wrapper'>
						
					</div>

				)

			}
			
		}

	}

})

export default AvatarComponent
import React from 'react'
import STORE from '../../../store.js'
import ACTIONS from '../../../actions.js'
import User from '../../../models/userModel.js'
import $ from 'jquery'
import _ from 'underscore'

const LeaderBoardComponent = React.createClass({

	_makePlayers: function(players){

		var playersArray = []

		if(STORE.data.leaderboard_stats != undefined && players != undefined){

			var allPlayerStats = STORE.data.leaderboard_stats
			console.log(allPlayerStats)
		
			for(var i = allPlayerStats.length+1; i >= 0; i--){		
			
				var thePlayerStats = allPlayerStats[i]

				if(thePlayerStats != undefined){

					var thePlayer = _.find(players, function(player){ 

						if(player._id === thePlayerStats.id){return player }

					})

					playersArray.push(<PlayerComponent stats={thePlayerStats} player={thePlayer} />)
				}	
							
			}

			return playersArray

		}
		
	},

	render: function(){

		
		return(

				<div name='player-select-wrapper'>

					{this._makePlayers(this.props.players)}
					
				</div>

			)
	
	}

})


const PlayerComponent = React.createClass({

	render: function(){

	

		if(this.props.player != undefined && this.props.stats != undefined){
			var name = this.props.player.name,
			winLoss = this.props.stats.winLoss,
			points = this.props.stats.points,
			wins = this.props.stats.wins,
			losses = this.props.stats.losses,
			theUrl = this.props.player.avatar_url
		}

		return(
			
			<div>
				
				<img id="small" src={theUrl} />
				<h4>{name}</h4>
				<p>win/loss ratio {winLoss}</p>
				<p>points scored{points}</p>
				<p>wins{wins}</p>
				<p>losses{losses}</p>

			</div>	

		)

	}

})

export default LeaderBoardComponent
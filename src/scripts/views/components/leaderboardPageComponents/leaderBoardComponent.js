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

			<div className="col s6 container center-align m6 offset-m3 green accent-4">

				
				<div className = 'card green accent-3'>

					<h2 className="white-text center-align card-content">Leaderboard</h2>

					<ul className="collection card-content" name='player-select-wrapper'>

						{this._makePlayers(this.props.players)}
						
					</ul>

				</div>

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
			
			<li className="collection-item avatar card-content green accent-3">
				
				<img className="circle" src={theUrl} />
				<h4 className="white-text">{name}</h4>
				<h5 className="white-text">win/loss ratio {winLoss}</h5>
				<h5 className="white-text">points scored {points}</h5>
				<h5 className="white-text">wins {wins}</h5>
				<p className="white-text">losses {losses}</p>

			</li>	

		)

	}

})

export default LeaderBoardComponent
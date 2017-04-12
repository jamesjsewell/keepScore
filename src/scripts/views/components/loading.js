import React from 'react'

const LoadingComponent = React.createClass({

	render: function(){

		return(

			<div className='loading-div'>

				.contain
				  - 10.times do
				    %svg{:height => "80", :width => "210"}
				      %ellipse{:cx => "25", :cy => "20", :fill => "#1D0333", :rx => "10", :ry => "10", :fill => "none"}

			</div>

		)

	}
})

export default LoadingComponent
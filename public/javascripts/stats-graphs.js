/* From http://stackoverflow.com/a/10284006/223092 */
function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

$(document).ready(function() {
    $.each(graphs_data, function(index, graph_data) {
        var graph_id = graph_data['id'],
            dataset,
            plot,
            graph_data,
            graph_div = $('#' + graph_id);

        graph_div.css('width', '700px');
        graph_div.css('height', '400px');

        dataset = [
            {'color': 'orange',
             'bars': {
                 'show': true,
                 'barWidth': 0.5,
                 'align': 'center'
             },
             'data': zip([graph_data['x_values'],
                          graph_data['y_values']])
            }
        ]

        if (graph_data['errorbars']) {
            dataset.push({
                'color': 'orange',
                'points': {
                    // Don't show these, just draw error bars:
                    'radius': 0,
                    'errorbars': 'y',
                    'yerr': {
                        'show': true,
                        'upperCap': "-",
                        'lowerCap': "-",
                        'radius': 5
                    }
                },
                'data': zip([graph_data['x_values'],
                             graph_data['y_values'],
                             graph_data['cis_below'],
                             graph_data['cis_above']])
            });
        }

        options = {
            'xaxis': {
                'ticks': graph_data['x_ticks'],
            },
            'yaxis': {
                'min': 0,
                'max': graph_data['y_max']
            },
            'xaxes': [{
                'axisLabel': graph_data['x_axis'],
                'axisLabelPadding': 20,
                'axisLabelColour': 'black'
            }],
            'yaxes': [{
                'axisLabel': graph_data['y_axis'],
                'axisLabelPadding': 20,
                'axisLabelColour': 'black'
            }],
            'series': {
		'lines': {
		    'show': false
		}
	    },
        }

        plot = $.plot(graph_div,
                      dataset,
                      options);
    });
});

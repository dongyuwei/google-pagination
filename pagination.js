(function(context){
    context.Pagination = function Pagination(config){
        this.config = config;
        
        this._checkParameter('baseUrl')
            ._checkParameter('totalPages')
            ._checkParameter('currentPageNumber');

        config.pageSize = config.pageSize || 10;

        this.pages = [];
    };

    Pagination.prototype = {
        constructor: Pagination,

        _checkParameter: function(parameter){
            if(!this.config[parameter]){
                throw new Error(this.constructor.toString() + ' need ' + parameter + ' parameter!');
            }
            return this;
        },

        _renderPreviousPage: function(){
            var pages = this.pages, config = this.config;

            if(config.currentPageNumber > 1){
                pages.push(template('<li><a href="{{url}}" rel="prev"><span class="prev active">Prev</span></a></li>',{
                    url : urlForPage(config.baseUrl, config.currentPageNumber - 1)
                }));
            }

            return this;
        },
        
        _renderNextPage: function(){
            var pages = this.pages, config = this.config;

            if(config.currentPageNumber < config.totalPages){
                pages.push(template('<li><a href="{{url}}" rel="next"><span class="next active">Next</span></a></li>',{
                    url : urlForPage(config.baseUrl, config.currentPageNumber + 1)
                }));
            }

            return this;
        },

        _renderMainPages: function(){
            var pages = this.pages, config = this.config, start, end;
            if(config.currentPageNumber <= config.pageSize / 2 + 1){
                start = 1;
                end = Math.min(config.pageSize, config.totalPages);
            }else{
                //render Sibling pages from Current page
                end = Math.min(config.currentPageNumber + Math.round(config.pageSize / 2) - 1, config.totalPages);
                start = config.currentPageNumber - Math.floor(config.pageSize / 2);
                start = Math.min(start, end - config.pageSize + 1);
            }
            for(var i = start; i <= end; i++){
                pages.push(template('<li><a href="{{url}}" class="{{current}}">{{page}}</a></li>', {
                    url : urlForPage(config.baseUrl, i),
                    page : i,
                    current : i === config.currentPageNumber ? 'current' : ''
                }));
            }
            return this;
        },

        toHTML: function(){
            this._renderPreviousPage()
                ._renderMainPages()
                ._renderNextPage();   

            return '<ul class="pagination">' + this.pages.join('') + '</ul>';
        }
    };

    function template (tmpl, data) {
        return tmpl.replace(/\{\{\s*(.*?)\s*\}\}/g, function () {
            return data[arguments[1]] || "";
        });
    };

    function urlForPage(baseUrl, page){
        var search = window.location.search;
        return encodeURI(search === "" ? baseUrl + page : baseUrl + page + search);
    };
})(typeof exports !== 'undefined' ? exports : window);
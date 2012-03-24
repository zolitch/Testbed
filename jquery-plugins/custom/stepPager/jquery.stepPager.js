/**
    jQuery.stepPager v0.1
    Stephen Zsolnai http://www.zolla.co.uk

    @license The MIT License (MIT)
    @preserve Copyright (c) <2012> <Stephen Zsolnai http://www.zolla.co.uk>


*/
/*jslint browser: true, vars: true, white: false, forin: true */
/*global define,require */
(function($){
    'use strict';

    $.stepPager = {
        defaults: {
            activeItemClass: 'sp-active-item',
            activeColumnClass: 'sp-active-column',
            rowNumber: 3,
            speed: 500,
            timer: 150
        }
    };

    $.fn.stepPager = function(options) {
        return this.each(function(){
            var settings = $.extend({}, $.stepPager.defaults, options),
                self = this,
                currentPageNumber = 1,
                ACTIVE_PAGE_CLASS = 'currentPage',
                pageTotal,
                navDisabled = false,
                $stepPager = $(this),
                $pagerWrap = $stepPager.find('> ul'),
                $pageItem = $pagerWrap.find('li'),
                itemWidth = $pageItem.outerWidth(true),
                itemHeight = $pageItem.outerHeight(true),
                $pagination = $('<ul class="nav-paging"></ul>'),
                scrollItems = function(value, pageNumber){
                    var i = 1,
                        $item = $pagerWrap.find('.col' + pageNumber);
                    $item.each(function(){
                        var $self = $(this),
                            position = $self.position(),
                            delay = i * settings.timer;
                        setTimeout(function () {
                            navDisabled = true;
                            $self.closest('li').animate({ 
                                'left': position.left + value 
                            }, settings.speed, "swing",function() {
                                navDisabled = false;
                            });
                        }, delay);
                        i +=1;
                    });
                },
                changePage = function(newPageNumber){
                    var i,
                        scrollMultiple = currentPageNumber - newPageNumber;
                    if(currentPageNumber !== newPageNumber){
                        for (i = 0; i < pageTotal; i+=1) {
                            scrollItems(itemWidth * scrollMultiple, i);
                        }
                    }
                    currentPageNumber = newPageNumber;
                },
                addHandlers = function(){
                    $pagination.delegate("a", "click", function() {
                        if(!navDisabled){
                            $pagination.find('li').removeClass(ACTIVE_PAGE_CLASS);
                            $(this).closest('li').addClass(ACTIVE_PAGE_CLASS);
                            changePage($(this).data('index'));
                        }
                    });
                },
                buildPagination = function(){
                    if($pageItem.length > pageTotal){
                        
                            var i;
                            for (i = 0; i < pageTotal; i+=1) {
                                $pagination.append('<li><a href="#page' + (i + 1) + '" data-index="' + (i + 1) + '">' + (i + 1) + '</a></li>');
                            }
                        $pagination.appendTo($stepPager);
                    }

                    $pagination.find('li:first').addClass(ACTIVE_PAGE_CLASS);
                },
                setUpItems = function(){
                    var itemCount,
                        currentRow = 0,
                        currentCol = 0,
                        top = 0,
                        left = 0;
                    $pagerWrap.height(itemHeight * settings.rowNumber);
                    $pageItem.css({
                        'position':'absolute',
                        'top:':0,
                        'left':0
                    });
                    $pageItem.each(function(){
                        top = currentRow * itemHeight;
                        left = currentCol * itemWidth;
                        $(this).css({'top':top, 'left':left});
                        if(currentRow < settings.rowNumber - 1){
                            currentRow += 1;
                            $(this).addClass('col' + currentCol);
                        }else{
                            $(this).addClass('col' + currentCol);
                            currentRow = 0;
                            currentCol += 1;
                        }
                    });
                },
                initPager = function(){
                    pageTotal = Math.ceil($pageItem.length / settings.rowNumber);
                    buildPagination();
                    addHandlers();
                    setUpItems();
                };
            initPager();
        });
    };

}(window.jQuery));

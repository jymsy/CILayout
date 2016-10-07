<?php
defined('BASEPATH') OR exit('No direct script access allowed');

return array(
    'header' => array(
        'type' => 'layout',
        'module' => 'public'
    ),
//    'content' => array(
//        'type' => 'layout'
//    ),
    'footer' => array(
        'type' => 'view',
        'components' => array(
            array(
                'href' => 'http://www.izaodao.com/Index/About#about',
                'title' => '关于早道'
            ),
            array(
                'href' => 'http://www.izaodao.com/questions.php?mod=rule',
                'title' => '使用协议'
            ),
            array(
                'href' => 'http://www.izaodao.com/Index/About#reports',
                'title' => '媒体报道'
            ),
            array(
                'href' => 'http://www.izaodao.com/Index/About#join',
                'title' => '加入我们'
            ),
            array(
                'href' => 'http://www.izaodao.com/Index/About#contact',
                'title' => '联系我们'
            )
        )
    )
);

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Layout
{

    public $CI;
    public $layout;
    public $module;
    protected $data;

    public function Layout($layout = 'main', $module = 'public')
    {
        $this->CI =& get_instance();
        $this->layout = $layout;
        $this->module = $module;
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
    }


    public function load($data = null, $module, $return = false)
    {
        $this->data = $data;
        return $this->loadLayout($this->layout, $module);
//        $dir = APPPATH . 'modules/' . $this->module . '/layouts/';
//        $file = $dir . $this->layout . '/' . $this->layout . '.php';
//        if (file_exists($file)) {
//            $meta = require_once($file);
//            foreach ($meta as $name => $attr) {
//                if ($attr['type'] === 'layout') {
//                    $this->loadLayout($name, $this->module);
//
//                } elseif ($attr['type'] === 'view') {
//                    $this->loadView($name, $this->module);
//                }
//            }
//        }
//        $data['content'] = $this->CI->load->view($view, $data, true);
//
//        if ($return) {
//            $output = $this->CI->load->view($this->layout, $data, true);
//            return $output;
//        } else {
//            $this->CI->load->view($this->layout, $data, false);
//        }
    }

    protected function loadLayout($name, $module = 'public')
    {
        $content = '';
        if ($meta = $this->requireMeta($module, 'layout', $name)) {
            foreach ($meta as $chileName => $attr) {
                if (isset($attr['module'])) {
                    $customModule = $attr['module'];
                } else {
                    $customModule = $module;
                }
                if ($attr['type'] === 'layout') {
                    $content .= $this->loadLayout($chileName, $customModule);

                } elseif ($attr['type'] === 'view') {
                    $content .= $this->loadView($chileName, $customModule);
                }
            }

            $this->data['content'] = $content;
            return $this->CI->load->view($name, $this->data, true);
        } else {
            //error
        }
    }

    protected function loadView($name, $module = 'public')
    {
        if ($this->module !== $module) {
            return $this->CI->load->view($module.'/'.$name, $this->data, true);
        } else {
            return $this->CI->load->view($name, $this->data, true);
        }

    }

    /**
     * @param $module
     * @param $type
     * @param $name
     * @return bool|array
     */
    protected function requireMeta($module, $type, $name)
    {
        $path = array(
            'modules',
            $module,
            $type,
            $name,
            'meta.php'
        );

        $file = APPPATH . implode(DIRECTORY_SEPARATOR, $path);
        if (file_exists($file)) {
            return require_once($file);
        } else {
            return false;
        }
    }
}
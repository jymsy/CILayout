<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

    public $module = 'svip';

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
        $this->load->helper('url');
	    $this->load->library('layout');
//        $this->load->library('layout');
        $ret = $this->layout->load('main', 'svip', array('title' => 'jym'));

//        $ret = $this->layout->loadView('logo', $this->module, array('title' => 'jym'));
        echo $ret;
//        echo 123;
//		$this->load->view('welcome_message');
	}
}

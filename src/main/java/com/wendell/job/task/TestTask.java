package com.wendell.job.task;

import java.util.TimerTask;

public class TestTask extends TimerTask {

	@Override
	public void run() {
		System.out.println(this.getClass().getName() + "::" + Thread.currentThread());
	}
}

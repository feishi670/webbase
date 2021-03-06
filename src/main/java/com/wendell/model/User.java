package com.wendell.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table
public class User {
	@Id
	@GeneratedValue
	private int id;
	@Column(insertable = true, length = 200, nullable = false, name = "name", unique = true, updatable = true)
	private String Name;
	@Column(insertable = true, length = 200, nullable = false, name = "nikeName", unique = true, updatable = true)
	private String nikeName;
	@Transient // 被标注此注解的属性不会被持久化到数据库
	private String temp;
	/**
	 * @Temporal 标注在日期等属性上，声明映射为数据库的特定诶其属性类型，默认为java.sql.Timestamp（TemporalType.TIMESTAMP）
	 *           此外还有java.sql.date（TemporalType.DATE）、java.sql.Time（TemporalType.TIME）
	 */
	@Temporal(TemporalType.TIME)
	private Date birthDate;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		this.Name = name;
	}

	public String getNikeName() {
		return nikeName;
	}

	public void setNikeName(String nikeName) {
		this.nikeName = nikeName;
	}

}

package com.example.springrest.domain.menu.repository;

import com.example.springrest.domain.menu.model.entity.Menu;
import com.example.springrest.global.common.repository.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper extends BaseMapper<Menu, String> {
    List<Menu> findAll();

    List<Menu> findAllWithSearch(@Param("menuName") String menuName,
            @Param("category") String category,
            @Param("useYn") String useYn,
            @Param("sort") String sort);

    Menu findById(@Param("menuId") String menuId);

    int insert(Menu menu);

    int update(Menu menu);

    int delete(@Param("menuId") String menuId);
}
